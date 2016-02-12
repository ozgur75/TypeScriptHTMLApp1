var IscObjects = (function () {
    function IscObjects() {
    }
    IscObjects.prototype.newDynamicForm = function (argumans) {
        return isc.DynamicForm.create({
            width: argumans.uzunluk,
            height: argumans.yukseklik,
            fields: argumans.fields,
            values: { slider: 4 }
        });
        //---
    };
    ;
    return IscObjects;
})();
;
var Form201 = (function () {
    function Form201() {
        this.kolonlar = [
            { title: "Text", type: "text", hint: "<nobr>A plain text field</nobr>" },
            { title: "Color Picker", type: "color" },
            { title: "TextArea", type: "textArea" },
            {
                title: "Stacked Spinner", editorType: "spinner", writeStackedIcons: true,
                defaultValue: 5, min: 0, max: 10, step: 0.5
            },
            {
                title: "Unstacked Spinner", editorType: "spinner", writeStackedIcons: false,
                defaultValue: 5, min: 0, max: 10, step: 0.5
            },
            {
                title: "Slider", name: "slider", editorType: "slider", width: 180,
                minValue: 1, maxValue: 5, numValues: 5, height: isc.Browser.isTouch ? 52 : 36
            },
            {
                title: "LinkItem", type: "link", name: "link", height: 36, target: "javascript",
                click: "isc.say('Hello world!')", linkTitle: "<br>Click Me<br>"
            },
            { title: "Checkbox", type: "checkbox", height: 25 },
            {
                title: "Radio Group", type: "radioGroup",
                valueMap: ["Option 1", "Option 2"]
            }
        ];
        this.io = new IscObjects();
        this.io.newDynamicForm({ yukseklik: 500, fields: this.kolonlar, uzunluk: 500 });
    }
    return Form201;
})();
;
var form201 = new Form201();
//isc.DynamicForm.create({
//    top: isc.Browser.isTouch ? 420 : 400,
//    width: 500,
//    numCols: 4,
//    isGroup: true,
//    groupTitle: "List - ComboBox",
//    fields: [{
//        name: "bugStatus", title: "Bug Status",
//        editorType: "comboBox",
//        valueMap: {
//            "new": "New",
//            "active": "Active",
//            "revisit": "Revisit",
//            "fixed": "Fixed",
//            "delivered": "Delivered",
//            "resolved": "Resolved",
//            "reopened": "Reopened"
//        }
//    }, {
//            name: "itemName", title: "Item Name", editorType: "comboBox",
//            optionDataSource: "supplyItem", pickListWidth: 250
//        }]
//});
/*
< script src= "isomorphic/system/modules/ISC_FileLoader.js" > </script>
< script src= "isomorphic/system/modules/ISC_Foundation.js" > </script>
< script src= "isomorphic/system/modules/ISC_Containers.js" > </script>
< script src= "isomorphic/system/modules/ISC_Grids.js" > </script>
< script src= "isomorphic/system/modules/ISC_Forms.js" > </script>
< script src= "isomorphic/system/modules/ISC_DataBinding.js" > </script>
< script src= "isomorphic/system/modules/ISC_Drawing.js" > </script>
< script src= "isomorphic/system/modules/ISC_Charts.js" > </script>
< script src= "isomorphic/system/modules/ISC_Calendar.js" > </script>

*/
/*
class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};

*/
/*

function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label);
    alert(labelledObj.size);
}

var myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
*/ 
//# sourceMappingURL=app.js.map