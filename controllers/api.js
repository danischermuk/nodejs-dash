// Express Router
var express   		= require('express');
var router    		= express.Router();
// Controllers
var authController 		= require('./auth'); 
var userController 		= require('./user');
var buildingController 	= require('./building');
var roomController 		= require('./room');
// Define Routes

/**********************************************************
						USER API
***********************************************************/

router.route('/user')
	.get 	(authController.isAuthenticated, userController.getUsers)
	.post 	(authController.isAuthenticated, userController.postUser);


router.route('/user/:user_id')
	.get 	(authController.isAuthenticated, userController.getUser)
	.put 	(authController.isAuthenticated, userController.updateUser)
	.delete (authController.isAuthenticated, userController.deleteUser);
	
router.route('/user/:user_id/menu')
	.get 	(authController.isAuthenticated, userController.getUserMenu);

/**********************************************************
						BUILDING API
***********************************************************/

router.route('/building')
	.get 	(authController.isAuthenticated, buildingController.getBuildings)
	.post 	(authController.isAuthenticated, buildingController.postBuilding);

router.route('/building/:building_id')
	.get 	(authController.isAuthenticated, buildingController.getBuilding)
	.put 	(authController.isAuthenticated, buildingController.updateBuilding)
	.delete (authController.isAuthenticated, buildingController.deleteBuilding);

router.route('/building/user/:user_id')
	.get 	(authController.isAuthenticated, buildingController.getBuildingsByUser)

/**********************************************************
						ROOM API
***********************************************************/

router.route('/room')
	.get 	(authController.isAuthenticated, roomController.getRooms)
	.post 	(roomController.postRoom);

router.route('/room/:room_id')
	.get 	(authController.isAuthenticated, roomController.getRoom)
	.put 	(authController.isAuthenticated, roomController.updateRoom)
	.delete (authController.isAuthenticated, roomController.deleteRoom);

/**********************************************************
						APPLIANCE API
***********************************************************/



module.exports = router;