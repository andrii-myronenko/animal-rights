declare module 'react-slideshow-image' {
    import * as React from "react";

    export interface Props { 
        duration: number;
        transitionDuration: number;
        infinite: boolean;
        indicators: boolean;
        arrows: boolean;
    }

    export class Slide extends React.Component<Props> {}
}