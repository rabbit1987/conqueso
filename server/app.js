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
    settings = require("./config/settings"),
    app = express(),
    serviceTracker = require("./serviceTracker"),

    // todo: remove
    PersistMysql = require("./persistMysql"),
    persist = new PersistMysql(),
    
    port = settings.getHttpPort();

require("./routes")(express, app, persist);

serviceTracker(persist);

app.listen(port);
console.log("Listening on port: " + port);