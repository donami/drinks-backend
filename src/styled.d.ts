// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    spacing: {
      small: string;
      normal: string;
      large: string;
      huge: string;
    };

    colors: {
      primary: string;
      secondary: string;
      accent: string;
      warning: string;
      gray: string;
      grayDarker: string;
      main: string;
    };
  }
}
