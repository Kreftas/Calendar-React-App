export const CS = (...classNames: CN[] | String[]) => {
    let build = ""
    for (const className of classNames) {
        build += className + " "
    }
    return build
}

export enum CN {
    APP = "App",
    HEADER = "Header",
    CONTENT = "Content",
    SLIM = "Slim",


    HOME_CONTENT = "Home-content",
    HOME_CONTAINER = "Home-container",
    HOME_HEADER = "Home-header",
    HOME_LISTS = "Home-lists",
    HOME_EVEN_CONTAINER = "Home-eventcontainer",
    HOME_EVENTLIST = "Home-eventlist",
    HOME_TODAYSEVENT = "Home-todaysevent",
    HOME_LIST = "Home-list",
    HOME_ITEMBOX = "Home-itembox",
    HOME_TODOBOX = "Home-todobox",
    HOME_EVENTBOX = "Home-eventbox",
    HOME_SPECIALBOX = "Home-specialbox",
    HOME_LABEL = "Home-label",
    HOME_BUTTONS = "Home-buttons",
    HOME_SPECIALLIST = "Home-speciallist",
    HOME_TOCAL_BUTTON = "Home-tocalendar-button",
    HOME_LIST_HEADER = "Home-list-header",
    HOME4 = "Home4",


    LOG_CONTENT = "Log-Content",
    LOG_BOX = "Log-box",
    LOG_FORM = "Log-form",
    LOG_BUTTON = "Log-button",
    LOG_INPUT = "Log-input",
    LOG_LABEL = "Log-label",


    BOX_TODO = "Item-box-todo",
    NEWTODO = "Item-newtodobox",
    TODO_LIST = "Container-todolist",
    TODO_LIST_SCROLL = "Mode-todolistscroll",
    TODO_LIST_CONTROLLER = "Component-todolistcontroller",
    TODOCONTROLBOX = "Component-todocontrolbox",
    TODOCONTROLLABEL = "Item-todocontrollabel",
    TODOCONTROL = "Item-todocontrol",


    LIST_BOX = "List-box",
    LIST_TODOBOX = "List-todobox",
    LIST_EVENTBOX = "List-eventbox",
    LIST_SPECIALBOX = "List-specialbox",

    TODOLABEL = "Item-todolabel",
    TODOBUTTONS = "Component-todobuttons",
    TODOBUTTON = "Item-todobutton",

    TODO_FORM = "Container-todoform",
    TODO_FORM_BOX = "Component-todoformbox",
    TODO_FORM_LABEL = "Item-todoformlabel",
    TODO_FORM_ALL_DAY = "Item-form-option",
    TODO_FORM_INPUTS = "Component-todoforminputs",
    TODO_FORM_INPUT = "Item-todoforminput",
    TODO_FORM_BUTTON = "Item-todoformbutton",


    TODO_CHANGE_FORM_BUTTONS = "Component-todochangeforms",
    TODO_CHANGE_FORM = "Item-todochangeform",
    TODO_ACTIVE_FORM_BUTTON = "Mode-activeformbutton",



    CALENDAR = "Calendar",
    CAL = "Cal",
    CALTABLE = "Cal-table",

    BOX_CAL = "Item-box-cal",
    CONTENTBOX = "Item-contentbox",
    ROWBOX = "Item-rowbox",
    COLUMNBOX = "Item-columnbox",

    HOUR_BOX = "Item-hourbox",
    HOUR_TOP = "Item-hourtop",
    HOUR_PARTBOX = "Item-hourpartbox",
    HOUR_PART = "Item-hourpart",
    SIDE_HOUR_BOX = "Item-sidehourbox",
    WEEK_HOUR_PART = "Item-week-hourpart",
    EVENT_BOX = "Item-eventbox",
    WEEK_POPUP_BOX = "Week-popup-box",
    WEEK_EVENTBOX_POPUP = "Week-eventbox-popup",
    MONTH_POPUP_BOX = "Month-popup-box ",
    MODE_POPUP_TOP = "Mode-popup-top",
    MODE_POPUP_BOTTOM = "Mode-popup-bottom",
    HOURTOP_SPECIALBOX = "Hourtop-specialbox",

    DAYBOX = "DayBox",
    DAY_SIDEBOX = "DaySideBox",
    DAY_SIDEBOX_EVENT = "DaySideBoxEvent",


    SIDEBAR = "Sidebar",
    LEFTBAR = "Left-bar",
    RIGHTBAR = "Right-bar",
    SIDEBAR_BUTTON ="Sidebar-button",
    SIDEBAR_ARROW_LEFT ="Sidebar-leftarrow",
    SIDEBAR_ARROW_LEFT_INNER ="Sidebar-leftarrow-inner",
    SIDEBAR_ARROW_RIGHT ="Sidebar-rightarrow",
    SIDEBAR_ARROW_RIGHT_INNER ="Sidebar-rightarrow-inner",

    CALHEADER = "Container-calheader",
    CALHEADBUTTON = "Component-calheadbutton",
    CALHEADACTIVE = "Mode-calheadactive",
    CALHEADDOUBLE = "Mode-calheaddouble",

    ROWMOULD = "Calcontent",
    COLUMNMOULD = "Calrow",
    BOXMOULD = "Item-boxmould",
    BOXCONTAINER = "Item-boxcontainer",
    BOXROW = "Item-boxrow",
    COLUMNBAR = "Component-columnbar",
    COLUMNBARBOXES = "Component-columnbarboxes",
    COLUMNBARSTART = "Component-columnbarstart",
    ROWBAR = "Component-rowbar",
    ROWBARBOX = "Item-rowbarbox",




    CLICKABLE = "Mode-clickable",
    HOVERABLE = "Mode-hoverable",
    LIGHT_HOVERABLE = "Mode-lighthover",

    DECORE_SPECIAL_BIRTH = "Decore-special-birth",
    DECORE_SPECIAL_HOLI = "Decore-special-holi",
    DECORE_SPECIAL_CELEB = "Decore-special-celeb",

    DECORE_EVENT = "Decore-event",
    DECORE_EVENT_DAY = "Decore-event-day",
    DECORE_EVENT_WEEK = "Decore-event-week",
    DECORE_EVENT_MONTH = "Decore-event-month",
    DECORE_EVENT_POPUP = "Decore-event-popup",

    PRIO_MODE_HIGH = "Mode-prio-high",
    PRIO_MODE_MED = "Mode-prio-med",
    PRIO_MODE_LOW = "Mode-prio-low",
    TYPE_BIRTH = "Mode-type-birth",
    TYPE_HOLI = "Mode-type-holi",
    TYPE_CELEB = "Mode-type-celeb",

    MODE_EVENTCOLOR_1 = "Mode-eventcolor-1",
    MODE_EVENTCOLOR_2 = "Mode-eventcolor-2",
    MODE_EVENTCOLOR_3 = "Mode-eventcolor-3",
    MODE_EVENTCOLOR_4 = "Mode-eventcolor-4",
    MODE_EVENTCOLOR_5 = "Mode-eventcolor-5",

    MODE_NO_COLOR = "Mode-no-color",

    FILL = "Mode-fill",
    CURRENTBOX = "Mode-currentbox",

    MONTHBOX = "Component-monthbox",



}