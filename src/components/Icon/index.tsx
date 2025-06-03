import React, { Suspense, useMemo } from "react";
import type { IconName } from "../../types/icon-names";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

const icons = {} as Record<
  string,
  React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>
>;

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const SvgIcon = useMemo(() => {
    let icon = icons[name];
    if (icon) return icon;
    icon = React.lazy(() => import(`../../assets/icons/${name}.svg?react`));
    icons[name] = icon;
    return icon;
  }, [name]);
  return (
    <Suspense fallback={null}>
      <SvgIcon {...props} />
    </Suspense>
  );
};

export default Icon;
