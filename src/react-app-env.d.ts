// Necessary to be able to import images as a module
declare module '*.jpg'
declare module '*.png'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.svg'

// Tell typescript to add gaCustomer instance to the global window object
// TODO: get the type library for the gaCustomer instance (instead of using "any")
type gaCustomerType = any

interface Window {
  gaCustomer: gaCustomerType
}

declare module 'react-facebook-login/dist/facebook-login-render-props' {
  export interface RenderProps {
    onClick:
      | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
      | undefined;
    isDisabled: boolean;
    isProcessing: boolean;
    isSdkLoaded: boolean;
  }

  interface ReactFacebookLoginProps {
    appId: string;
    callback(userInfo: ReactFacebookLoginInfo): void;
    onFailure?(response: ReactFacebookFailureResponse): void;

    autoLoad?: boolean;
    buttonStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    cookie?: boolean;
    cssClass?: string;
    disableMobileRedirect?: boolean;
    fields?: string;
    icon?: string | React.ReactNode;
    isDisabled?: boolean;
    language?: string;
    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
    reAuthenticate?: boolean;
    redirectUri?: string;
    scope?: string;
    size?: 'small' | 'medium' | 'metro';
    textButton?: string;
    typeButton?: string;
    version?: string;
    xfbml?: boolean;
    isMobile?: boolean;
    tag?: Node | React.Component<any>;
    render(props: RenderProps): void;
  }

  interface ReactFacebookFailureResponse {
    status?: string;
  }

  interface ReactFacebookLoginInfo {
    id: string;
    accessToken: string;
    name?: string;
    email?: string;
  }

  interface ReactFacebookLoginState {
    isSdkLoaded?: boolean;
    isProcessing?: boolean;
  }

  export default class ReactFacebookLogin extends React.Component<
    ReactFacebookLoginProps,
    ReactFacebookLoginState
  > {}
}