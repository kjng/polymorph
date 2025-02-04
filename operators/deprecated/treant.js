core.registerOperator("treant", function (operator) {
    let me = this;
    this.settings = {};

    this.rootdiv = document.createElement("div");
    //Add content-independent HTML here. fromSaveData will be called if there are any items to load.
    this.rootdiv.innerHTML = ``;
    
    scriptassert([["jquery","3pt/jquery.min.js"],["treant","3pt/Treant.js","3pt/Treant.css"]],()=>{
        
    })


    operator.div.appendChild(this.rootdiv);

    //////////////////Handle core item updates//////////////////

    //these are optional but can be used as a reference.
    core.on("updateItem", function (d) {
        let id = d.id;
        let sender = d.sender;
        if (sender == me) return;
        //Check if item is shown
        //Update item if relevant
        //This will be called for all items when the items are loaded.
    });

    core.on("focus", function (d) {
        let id = d.id;
        let s = d.sender;
        // An item was focused.
    });

    core.on("deleteItem", function (d) {
        let id = d.id;
        let s = d.sender;
        if (sender == me) return;
        // An item was created.
    });

    core.on("dateUpdate",function (d) {
        let id = d.id;
        let s = d.sender;
        if (sender == me) return;
        // The date of an item was updated.
    });

    this.resize=function(){
        // This is called when my parent rect is resized.
    }

    //For interoperability between views you may fire() and on() your own events. You may only pass one object to the fire() function; use the properties of that object for additional detail.


    //////////////////Handling local changes to push to core//////////////////

    //Handle item creation, locally
    this.createItem = function () {
        //Create a new item
        let it = {};

        //register it with the core
        let id = core.insertItem(it);

        //register a change
        core.fire("updateItem", {
            sender: this,
            id: id
        });
    }

    //Register changes with core
    this.somethingwaschanged = function () {
        core.fire("updateItem", {
            id: itemID,
            sender: this
        });
    }

    //Register focus with core
    this.somethingwasfocused = function () {
        core.fire("focus", {
            id: itemID,
            sender: this
        });
    }

    this.somethingwasdeleted = function () {
        core.fire("deleteItem", {
            id: itemID,
            sender: this
        });
        //Don't actually delete() the item! core will manage that.
    }

    //Saving and loading
    this.toSaveData = function () {
        return this.settings;
    }

    this.fromSaveData = function (d) {
        Object.assign(this.settings, d);
        this.processSettings();
    }



    //Handle a change in settings (either from load or from the settings dialog or somewhere else)
    this.processSettings = function () {

    }

    //Create a settings dialog
    scriptassert([
        ["dialog", "genui/dialog.js"]
    ], () => {
        me.dialog = document.createElement("div");

        me.dialog.innerHTML = `
        <div class="dialog">
        </div>`;
        dialogManager.checkDialogs(me.dialog);
        //Restyle dialog to be a bit smaller
        me.dialog = me.dialog.querySelector(".dialog");
        me.innerDialog = me.dialog.querySelector(".innerDialog");
        operator.div.appendChild(me.dialog);
        let d = document.createElement("div");
        d.innerHTML = `
        WHAT YOU WANT TO PUT IN YOUR DIALOG
        `;
        me.innerDialog.appendChild(d);

        //When the dialog is closed, update the settings.
        me.dialog.querySelector(".cb").addEventListener("click", function () {
            me.updateSettings();
        })

        me.showSettings = function () {
            me.dialog.style.display = "block";
        }
    })



});