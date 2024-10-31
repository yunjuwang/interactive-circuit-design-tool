import * as MuiIcons from "@mui/icons-material";

export const IconResolver = ({ iconName, ...props }) => {
  const IconComponent = MuiIcons[iconName];

  if (!IconComponent) {
    console.error(`Icon "${iconName}" not found`);
    return null; // You can return a default icon or an empty element here
  }

  return <IconComponent {...props} />;
};
