import { ReactNode, DetailedHTMLProps, HTMLAttributes, HTMLProps } from "react";

interface Tags {
  [tag: string]: (
    strings: TemplateStringsArray,
    ...n: ((props: any) => string)[]
  ) => (
    props: DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
      Record<string, any>,
  ) => ReactNode;
}

const tailplug = new Proxy({} as Tags, {
  get(_, name) {
    const Tag = name as keyof JSX.IntrinsicElements;
    return (
      strings: TemplateStringsArray,
      ...n: ((props: any) => string)[]
    ) => {
      return (props: any) => {
        let classes = "";
        for (let i = 0; i < strings.length; i++) {
          classes += strings[i];
          if (n[i]) {
            if (typeof n[i] === "function") {
              console.log("a", n[i](props));
              classes += n[i](props);
            }
          }
        }

        return (
          <Tag {...props} className={`${props.className} ${classes}`}>
            {props.children}
          </Tag>
        );
      };
    };
  },
});

export default tailplug;
