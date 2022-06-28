import { NavigateFunction } from "react-router-dom";
import { Controls } from "../list/TypeControl";
import { EOrigin } from "./Form";


export const onSuccess = (navigate : NavigateFunction, from : Controls, origin: EOrigin) => {
    switch (origin) {
        default:
            navigate("../todos", { replace: true, state: { form: from } });
            break;
        case EOrigin.CALENDAR:
            navigate("../cal", { replace: true});
    }     
}

export const onFail = () => {
    alert("Server error")
}
