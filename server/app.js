/**
* COPYRIGHT (C) 2014, Rapid7 LLC, Boston, MA, USA.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var express = require("express"),
    app = express(),
    config = require("./config/settings"),
    logger = require("./logger"),
    port = config.getHttpPort();

logger.info("Starting Conqueso server");

var PersistenceService = require("./db/persistenceService"),
    persistenceService = new PersistenceService(function() {
        app.listen(port, function() {
            // Load server default properties and roles if defaults.json file specified
            require("./propertyLoader")(persistenceService);

            logger.info("Listening on port %d", port);
            
            if (process.env.NODE_ENV === "production" && process.setuid && process.setgid) {
                process.setgid("conqueso");
                process.setuid("conqueso");
            }
        });
    });

require("./routes/web")(express, app);
require("./routes/api")(express, app, persistenceService);
require("./routes/oldApi")(express, app, persistenceService);
require("./serviceTracker")(persistenceService);