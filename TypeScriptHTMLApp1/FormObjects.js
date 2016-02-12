//#region Genel Metodlar
function getFuncObj(propObj, PropertyName, FunctionName, PropertyValue) {
    if (!propObj)
        propObj = {};
    if (FunctionName)
        propObj.functionName = FunctionName;
    if (PropertyName)
        propObj.propertyName = PropertyName;
    propObj.value = PropertyValue;
    return propObj;
}
;
function getPropObj(PropertyName, PropertyValue) {
    tmp = {};
    tmp[PropertyName] = PropertyValue;
    return tmp;
}
;
function addPropFunc(prop, PropertyName, PropertyValue, FunctionName) {
    prop[PropertyName] = getFuncObj(prop[PropertyName], PropertyName, FunctionName, PropertyValue);
}
;
function propertyGuncelle(obj, prop, pgmObj) {
    if (!pgmObj)
        pgmObj = {};
    for (var i in prop) {
        if (prop[i].functionName) {
            //obj[prop[i].functionName]((!pgmObj[prop[i].value]) ? prop[i].value : pgmObj[prop[i].value]);                
            obj[prop[i].functionName](pgmObj[prop[i].value] || prop[i].value);
        }
        else {
            isc.addProperties(obj, getPropObj(prop[i].propertyName, (!pgmObj[prop[i].value]) ? prop[i].value : pgmObj[prop[i].value]));
        }
    }
    ;
}
;
function getObjArray(frmObj) {
    var tmpArr = [];
    for (var i in frmObj) {
        if (i == "dataSourceList")
            continue;
        tmpobj = frmObj[i]();
        tmpobj.name = i;
        tmpArr.push(tmpobj);
    }
    return tmpArr;
}
;
function createGuid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + (Math.random() + Math.random()) * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
;
//#endregion
var FormObjects = (function () {
    function FormObjects() {
    }
    FormObjects.prototype.RibbonBar = function () {
        return {
            name: "RibbonBar",
            description: "Ribbon Bar",
            isFolder: true,
            getProperty: function () { }
        };
    };
    ;
    return FormObjects;
})();
;
var FormObjects1 = {
    dataSourceList: { name: "denene" },
    RibbonBar: function () {
        return {
            name: "RibbonBar", description: "Ribbon Bar", isFolder: true,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = isc.RibbonBar.create({
                    vwo: vwObjects,
                    width: "100%",
                    height: "100",
                    autoDraw: false,
                    showEdges: false,
                    groupTitleAlign: "center",
                    groupTitleOrientation: "top",
                    //membersMargin: 2,
                    layoutMargin: 2,
                    animateMembers: true,
                    animateMemberTime: 1200
                });
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            },
            addMember: function (newMember) {
                this.obj.addGroup(newMember);
            }
        };
    },
    RibbonGroup: function () {
        return {
            name: "RibbonGroup", description: "Ribbon Group", isFolder: true,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                    addPropFunc(this.prop, "title", "İşlemler1", "setTitle");
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = isc.RibbonGroup.create({
                    vwo: vwObjects,
                    title: "İşlemler",
                    numRows: 2,
                    titleAlign: "left",
                    height: "100%",
                    layoutMargin: 2,
                    autoDraw: false,
                    controls: []
                });
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            },
            addMember: function (newMember) {
                this.obj.addControl(newMember);
            }
        };
    },
    RibbonIconButton: function () {
        return {
            name: "RibbonIconButton", description: "Ribbon Icon Button", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                    addPropFunc(this.prop, "title", "Görüntüle", "setTitle");
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = isc.IconButton.create({
                    vwo: vwObjects,
                    title: "icon Button",
                    orientation: "vertical",
                    autoDraw: false,
                    largeIcon: "../../Images/ProgramEditor/Preview.png"
                });
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            },
            addMember: function (newMember) {
                this.obj.addField(newMember);
            }
        };
    },
    AdvancedFilter: function () {
        return {
            name: "AdvancedFilter", description: "Advanced Filter", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = isc.FilterBuilder.create({
                    autoDraw: false,
                    vwo: vwObjects
                });
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            },
            addMember: function (newMember) {
                this.obj.addField(newMember);
            }
        };
    },
    DynamicForm: function () {
        return {
            name: "DynamicForm", description: "Dynamic Form", isFolder: true,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = isc.DynamicForm.create({
                    vwo: vwObjects,
                    autoDraw: false,
                    autofit: true,
                    title: "Form",
                });
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            },
            addMember: function (newMember) {
                this.obj.addField(newMember);
            }
        };
    },
    HeaderItem: function () {
        return {
            name: "HeaderItem", description: "Header", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = {
                    vwo: vwObjects,
                    _constructor: "HeaderItem",
                    autoDraw: false,
                    value: "Başlık"
                };
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            }
        };
    },
    TextItem: function () {
        return {
            name: "TextItem", description: "Text Box", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = {
                    vwo: vwObjects,
                    autoDraw: false,
                    title: "Text",
                    type: "TextItem"
                };
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            }
        };
    },
    //---
    RowSpacer: function () {
        return {
            name: "RowSpacer", description: "Row Spacer", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = {
                    vwo: vwObjects,
                    height: 1,
                    _constructor: "RowSpacerItem"
                };
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            }
        };
    },
    //---
    CheckBox: function () {
        return {
            name: "CheckBox", description: "Check Box", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = {
                    vwo: vwObjects,
                    autoDraw: false,
                    title: "CheckBox",
                    type: "checkbox",
                    height: 25
                };
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            }
        };
    },
    RadioGroup: function () {
        return {
            name: "RadioGroup", description: "Radio Group", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = {
                    vwo: vwObjects,
                    autoDraw: false,
                    title: "Radio Group",
                    type: "radioGroup",
                    valueMap: ["Option 1", "Option 2"]
                };
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            }
        };
    },
    Slider: function () {
        return {
            name: "Slider", description: "Slider", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = {
                    vwo: vwObjects,
                    autoDraw: false,
                    title: "Slider",
                    name: "slider",
                    editorType: "slider",
                    width: 180,
                    minValue: 1,
                    maxValue: 5,
                    numValues: 5,
                    height: isc.Browser.isTouch ? 52 : 36
                };
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            }
        };
    },
    Spinner: function () {
        return {
            name: "Spinner", description: "Spinner", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = {
                    vwo: vwObjects,
                    autoDraw: false,
                    title: "Spinner",
                    editorType: "spinner",
                    defaultValue: 5,
                    min: 0,
                    max: 10,
                    step: 0.5
                };
                propertyGuncelle(this.obj, this.prop, vwObjects);
                return this.obj;
            }
        };
    },
    TextArea: function () {
        return {
            name: "TextArea", description: "Text Area", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = {
                    vwo: vwObjects,
                    autoDraw: false,
                    title: "TextArea",
                    type: "textArea"
                };
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            }
        };
    },
    Color: function () {
        return {
            name: "Color", description: "Color Picker", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = {
                    vwo: vwObjects,
                    autoDraw: false,
                    title: "Renk Seç",
                    type: "color"
                };
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            }
        };
    },
    Date: function () {
        return {
            name: "Date", description: "Tarih", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = {
                    vwo: vwObjects,
                    autoDraw: false,
                    name: "Date",
                    type: "date",
                    useTextField: true,
                    dateFormatter: "toEuropeanShortDate"
                };
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            }
        };
    },
    Time: function () {
        return {
            name: "Time", description: "Saat", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = {
                    vwo: vwObjects,
                    autoDraw: false,
                    //name: "Time",
                    title: "Saat",
                    type: "time"
                };
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            }
        };
    },
    Select: function () {
        return {
            name: "Select", description: "Combo List", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = {
                    vwo: vwObjects,
                    autoDraw: false, editorType: "SelectItem",
                    title: "listele",
                    pickListProperties: {
                        showFilterEditor: true
                    },
                    //multiple: true,
                    showFilterEditor: true
                };
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            }
        };
    },
    TabSet: function () {
        return {
            name: "TabSet", description: "Tab Set", isFolder: true,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                    addPropFunc(this.prop, "width", "100%", "setWidth");
                    addPropFunc(this.prop, "height", "100%", "setHeight");
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = isc.TabSet.create({
                    vwo: vwObjects,
                    autoDraw: false,
                    //width: "100%",
                    //height: "100%",
                    tabBarPosition: "top",
                    margin: 0,
                    border: "1px solid black"
                });
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            },
            addMember: function (newMember) {
                this.obj.addTab(newMember);
            }
        };
    },
    Tab: function () {
        return {
            name: "Tab", description: "Tab Panel", isFolder: true,
            aotufit: true,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = {
                    vwo: vwObjects,
                    title: "Panel",
                    border: "1px solid black",
                    canClose: false,
                    selectTab: true,
                    pane: FormObjects.VLayout().getObj(vwObjects),
                    autoDraw: false
                };
                propertyGuncelle(this.obj, this.getProperty(), vwObjects);
                return this.obj;
            },
            addMember: function (newMember) {
                this.obj.pane.addMember(newMember);
            }
        };
    },
    VLayout: function () {
        return {
            name: "VLayout", description: "Dikey Düzenleme", isFolder: true,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = isc.VLayout.create({
                    vwo: vwObjects,
                    autoDraw: false,
                    margin: 1,
                    border: "1px solid black",
                    //width: "100%",
                    //height: "100%",
                    autofit: true
                });
                propertyGuncelle(this.obj, this.prop, vwObjects);
                return this.obj;
            },
            addMember: function (newMember, vwObjects) {
                if (!this.obj)
                    this.obj = this.getObj(vwObjects);
                this.obj.addMember(newMember);
            }
        };
    },
    HLayout: function () {
        return {
            name: "HLayout", description: "Yatay Düzenleme", isFolder: true,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = isc.HLayout.create({
                    vwo: vwObjects,
                    autoDraw: false,
                    margin: 10,
                    border: "1px solid black",
                    width: "100%",
                    height: "100%"
                });
                propertyGuncelle(this.obj, this.prop, vwObjects);
                return this.obj;
            },
            addMember: function (newMember, vwObjects) {
                if (!this.obj)
                    this.obj = this.getObj(vwObjects);
                this.obj.addMember(newMember);
            }
        };
    },
    IButton: function () {
        return {
            name: "IButton", description: "Button Item", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = isc.IButton.create({
                    vwo: vwObjects,
                    autoDraw: false,
                    title: "Button",
                    width: 150
                });
                propertyGuncelle(this.obj, this.prop, vwObjects);
                return this.obj;
            }
        };
    },
    Label: function () {
        return {
            name: "Label", description: "Label", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = isc.Label.create({
                    vwo: vwObjects,
                    autoDraw: false,
                    padding: 10,
                    align: "center",
                    valign: "center",
                    wrap: false,
                    //icon: "icons/16/approved.png",
                    showEdges: true,
                    contents: "Bir başlık girin..."
                });
                propertyGuncelle(this.obj, this.prop, vwObjects);
                return this.obj;
            }
        };
    },
    PassWord: function () {
        return {
            name: "PassWord", description: "Şifre", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.prop, PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = {
                    vwo: vwObjects,
                    _constructor: "PasswordItem",
                    title: "Şifre",
                    autoDraw: false
                };
                propertyGuncelle(this.obj, this.prop, vwObjects);
                return this.obj;
            }
        };
    },
    ComboBoxItem: function () {
        return {
            name: "ComboBoxItem", description: "Combo Box", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                if (!this.obj) {
                    this.obj = {
                        vwo: vwObjects,
                        _constructor: "ComboBoxItem",
                        addUnknownValues: false,
                        pickListProperties: {
                            showFilterEditor: true
                        },
                        title: "Combo",
                        autoDraw: false
                    };
                }
                propertyGuncelle(this.obj, this.prop, vwObjects);
                return this.obj;
            }
        };
    },
    ListGrid: function () {
        return {
            name: "ListGrid", description: "List Grid", isFolder: true,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = isc.ListGrid.create({
                    vwo: vwObjects,
                    autoDraw: false,
                    alternateRecordStyles: true,
                    autoFitFieldWidths: true,
                    width: "100%",
                    height: "100%"
                });
                propertyGuncelle(this.obj, this.prop, vwObjects);
                return this.obj;
            },
            addMember: function (newMember) {
                this.obj.addField(newMember);
            }
        };
    },
    TreeGrid: function () {
        return {
            name: "TreeGrid", description: "Tree Grid", isFolder: true,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = isc.TreeGrid.create({
                    vwo: vwObjects,
                    //ID: "employeeTree",
                    width: 500,
                    height: 400,
                    //dataSource: "employees",
                    canDragRecordsOut: true,
                    canAcceptDroppedRecords: true,
                    autoFetchData: true
                });
                propertyGuncelle(this.obj, this.prop, vwObjects);
                return this.obj;
            },
            addMember: function (newMember) {
                this.obj.addField(newMember);
            }
        };
    },
    GridField: function () {
        return {
            name: "GridField", description: "Grid Field", isFolder: false,
            getProperty: function () {
                if (!this.prop) {
                    this.prop = {};
                }
                ;
                return this.prop;
            },
            addProperty: function (PropertyName, PropertyValue, FunctionName) {
                addPropFunc(this.getProperty(), PropertyName, PropertyValue, FunctionName);
            },
            getObj: function (vwObjects) {
                this.obj = {
                    vwo: vwObjects,
                    name: createGuid(),
                    title: "ListGridField"
                };
                propertyGuncelle(this.obj, this.prop, vwObjects);
                return this.obj;
            }
        };
    }
};
//# sourceMappingURL=FormObjects.js.map