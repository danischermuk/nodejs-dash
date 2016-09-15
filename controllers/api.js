// Express Router
var express   		= require('express');
var router    		= express.Router();
// Controllers
var authController 		= require('./auth'); 
var userController 		= require('./user');
var buildingController 	= require('./building');


// Define Routes

/**********************************************************
						USER API
***********************************************************/

router.route('/user')
	.get 	(authController.isAuthenticated, userController.getUsers)
	.post 	(authController.isAuthenticated, userController.postUser);

router.route('/user/me')
	.get 	(authController.isAuthenticated, userController.getReqUser);


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

router.route('/building/:building_id/room')
	.get 	(authController.isAuthenticated, buildingController.getBuildingRooms)
	.post 	(authController.isAuthenticated, buildingController.postBuildingRoom);

 router.route('/building/:building_id/room/:room_id')
 	.get 	(authController.isAuthenticated, buildingController.getBuildingRoom)
 	.put 	(authController.isAuthenticated, buildingController.updateBuildingRoom)
 	.delete (authController.isAuthenticated, buildingController.deleteBuildingRoom);

/**********************************************************
						APPLIANCE API
***********************************************************/



module.exports = router;