import { NAV_ITEMS } from "@/shared/data";
import { List, ListItem, ListItemButton, Typography, useTheme } from "@mui/joy";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNavList() {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <List size="md">
      {NAV_ITEMS.map((option) => (
        <ListItem
          key={option.path}
          sx={{
            mb: 1,
            textDecoration: "none",
          }}
          component={Link}
          href={option.path}
        >
          <ListItemButton
            selected={pathname === option.path}
            sx={{
              fontWeight: 500,
              borderRadius: theme.radius.sm,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
              }}
            >
              {option.label}
            </Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
