import { css } from "styled-components";
import { breakpointsMedia } from "./breakpointsMedia";

export function propToStyle(propName) {
    return function(props) {
        const propValue = props[propName]; // string or object
        if(typeof propValue === 'string') {
            return {
                [propName]: props[propName]
            }
        }
        else if(typeof propValue === 'object') {
            console.log('propValue', propValue)
            return breakpointsMedia({
                xs: {
                    [propName]: propValue.xs                
                },
                sm: {
                    [propName]: propValue.sm                
                },
                md: {
                    [propName]: propValue.md                
                },
                lg: {
                    [propName]: propValue.lg                
                },
                xl: {
                    [propName]: propValue.xl                
                },
            })
        }
    }
}
