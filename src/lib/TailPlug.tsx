import {
  ReactNode,
  DetailedHTMLProps,
  SVGProps,
  HTMLAttributes,
  InputHTMLAttributes,
  ElementType,
  FC,
} from "react";

type AnyComponent<P extends object = any> = React.ComponentType<P>;

type Taggable = (
  strings: TemplateStringsArray,
  ...n: ((props: any) => string)[]
) => (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    // I need to find a better way to do this
    // DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> &
    // SVGProps<SVGGElement> &
    Record<string, any>,
) => ReactNode;

interface Tags {
  (tag: AnyComponent): Taggable;
  [tag: string]: Taggable;
}

interface ComponentProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: ElementType;
}

const Component: FC<ComponentProps> = ({ as: Tag = "div", ...otherProps }) => {
  return <Tag {...otherProps} />;
};

const proxy = <T,>(Tag: AnyComponent, tag?: string): T => {
  return ((strings: TemplateStringsArray, ...n: ((props: any) => string)[]) => {
    return (props: any) => {
      let classes = "";
      for (let i = 0; i < strings.length; i++) {
        classes += strings[i];
        if (n[i]) {
          if (typeof n[i] === "function") {
            classes += n[i](props);
          }
        }
      }

      const res = (
        <Tag
          as={tag ?? undefined}
          {...props}
          className={`${props.className ?? ""} ${classes}`}
        >
          {props.children}
        </Tag>
      );

      return res;
    };
  }) as T;
};

//const outerProxy = (el:)=>{}

const plug = new Proxy(proxy as Tags, {
  get(_, name: keyof JSX.IntrinsicElements) {
    return proxy(Component, name);
  },
});

export default plug;

type A = {
  p: string;
};
type B = {
  p: boolean;
};
const F = <T extends { p?: any }>(a: T) => {
  return a?.p as (typeof a)["p"];
};
const a: A = {
  p: "a",
};
const b: B = {
  p: false,
};
const rA = F(a);
const rB = F(b);
