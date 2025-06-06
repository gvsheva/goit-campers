import React, { Suspense, useMemo } from "react";
import type { IconName } from "../../types/icon-names";
import LoaderOverlay from "../LoaderOverlay";
import css from "./Icon.module.css";
import classNames from "classnames";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

const icons = {} as Record<
  string,
  React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>
>;

const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  const SvgIcon = useMemo(() => {
    let icon = icons[name];
    if (icon) return icon;
    icon = React.lazy(() => import(`../../assets/icons/${name}.svg?react`));
    icons[name] = icon;
    return icon;
  }, [name]);
  return (
    <div className={classNames(className, css.wrapper)}>
      <Suspense fallback={<LoaderOverlay className={css.loading} />}>
        <SvgIcon {...props} className={css.icon} />
      </Suspense>
    </div>
  );
};

export default Icon;
