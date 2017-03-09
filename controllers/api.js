// Express Router
var express   		= require('express');
var router    		= express.Router();
// Controllers
var authController 		= require('./auth'); 
var userController 		= require('./user');
var buildingController 	= require('./building');
var applianceController = require('./appliance');


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

router.route('/b')
	.get 	(authController.isAuthenticated, buildingController.getBuildings)
	.post 	(authController.isAuthenticated, buildingController.postBuilding);

router.route('/b/:building_id')
	.get 	(authController.isAuthenticated, buildingController.getBuilding)
	.put 	(authController.isAuthenticated, buildingController.updateBuilding)
	.delete (authController.isAuthenticated, buildingController.deleteBuilding);

router.route('/b/user/:user_id')
	.get 	(authController.isAuthenticated, buildingController.getBuildingsByUser)

router.route('/b/:building_id/r')
	.get 	(authController.isAuthenticated, buildingController.getBuildingRooms)
	.post 	(authController.isAuthenticated, buildingController.postBuildingRoom);

 router.route('/b/:building_id/r/:room_id')
 	.get 	(authController.isAuthenticated, buildingController.getBuildingRoom)
 	.put 	(authController.isAuthenticated, buildingController.updateBuildingRoom)
 	.delete (authController.isAuthenticated, buildingController.deleteBuildingRoom);

 router.route('/b/:building_id/r/:room_id/a')
 	.get 	(authController.isAuthenticated, buildingController.getBuildingRoomAppliance)
 	.post 	(authController.isAuthenticated, buildingController.postBuildingRoomAppliance);

 router.route('/b/:building_id/r/:room_id/a/:appliance_id')
	.delete 	(authController.isAuthenticated, buildingController.deleteBuildingRoomAppliance); 	


/**********************************************************
						APPLIANCE API
***********************************************************/

router.route('/appliance')
	.get 	(authController.isAuthenticated, applianceController.getAppliances)
	.post 	(authController.isAuthenticated, applianceController.postAppliance);

router.route('/appliance/:appliance_id')
	.get 	(authController.isAuthenticated, applianceController.getAppliance)
	.put 	(authController.isAuthenticated, applianceController.updateAppliance)
	.delete (authController.isAuthenticated, applianceController.deleteAppliance);

router.route('/appliance/switch')
	.post 	(authController.isAuthenticated, applianceController.switchAppliance);

module.exports = router;