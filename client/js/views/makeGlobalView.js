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

define(["jquery", "underscore", "backbone", "bootstrap",
        "../models/property",
        "hbars!templates/makeGlobal.template"],
function($, _, Backbone, Bootstrap, Property, makeGlobalTemplate) {
    
    return Backbone.View.extend({
        el : "#modal",

        events : {
            "click .confirm-make-global" : "confirmMakeGlobal"
        },

        render: function(role, propertyName) {
            this.roleName = role;
            this.property = new Property({
                id : propertyName,
                name : propertyName,
                role : role
            });
            this.$el.html(makeGlobalTemplate(this.property.toJSON())).modal("show");
        },

        confirmCallback: function() {
            this.$el.modal("hide");
            this.trigger("property:globalize", this.roleName);
        },

        confirmMakeGlobal: function() {
            this.property.globalize({success : _.bind(this.confirmCallback, this) });
        }
    });
});