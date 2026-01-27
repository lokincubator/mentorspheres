import React from "react";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

type Profile = {
  name: string;
  avatarInitials: string;
  quote: string;
  facts: Array<{ label: string; value: string }>;
  bio: string;
  coreNeeds: string[];
  frustrations: string[];
  personality: string[];
  brands: Array<{ label: string }>;
};

const demoProfile: Profile = {
  name: "Cameron Williamson",
  avatarInitials: "CW",
  quote:
    "I am used to with online service and I usually do my online shopping from Instagram.",
  facts: [
    { label: "Age", value: "47" },
    { label: "Education", value: "Masters in Business" },
    { label: "Status", value: "Single" },
    { label: "Occupation", value: "Sales Manager" },
    { label: "Location", value: "New York" },
    { label: "Tech literate", value: "High" },
  ],
  bio:
    "She currently lives in Sydney. She finished her master in business and has just been promoted to Sales Manager. She is currently single and likes to go out with friends on long holidays.",
  coreNeeds: [
    "Need to find people with similar skills that can help her tackle company goals.",
    "View all her hirings in an overview",
    "The price of the service is very important",
  ],
  frustrations: [
    "Price is high related to quality they provide",
    "Currently finds perfect people from past work relations, family, friends and within my circle and online which is tedious",
    "Not much choice and comparison is not available",
  ],
  personality: ["Extrovert", "Reader", "Spender", "Tech-savvy"],
  brands: [{ label: "NASA" }, { label: "HUAWEI" }, { label: "Instagram" }, { label: "BELLE" }],
};

function SectionCard(props: {
  title: string;
  children: React.ReactNode;
  sx?: any;
}) {
  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, ...props.sx }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        {props.title}
      </Typography>
      {props.children}
    </Paper>
  );
}

function SidebarCard({ profile }: { profile: Profile }) {
  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, textAlign: "center" }}>
            {profile.name}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Avatar
              sx={{
                width: 92,
                height: 92,
                fontWeight: 800,
              }}
            >
              {profile.avatarInitials}
            </Avatar>
          </Box>
        </Box>

        <Divider />

        <Stack spacing={1.25}>
          {profile.facts.map((f) => (
            <Box
              key={f.label}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: 0.6,
                  color: "text.secondary",
                }}
              >
                {f.label}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {f.value}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Paper
          variant="outlined"
          sx={{ p: 2, borderRadius: 2, bgcolor: "background.paper" }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {profile.quote}
          </Typography>
        </Paper>

        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.25 }}>
            Personality
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {profile.personality.map((p) => (
              <Chip key={p} label={p} size="small" variant="outlined" />
            ))}
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <Stack spacing={0.75}>
      {items.map((t, idx) => (
        <Typography key={`${idx}-${t}`} variant="body2" sx={{ color: "text.secondary" }}>
          {t}
        </Typography>
      ))}
    </Stack>
  );
}

function BrandsRow({ brands }: { brands: Array<{ label: string }> }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
      {brands.map((b) => (
        <Paper
          key={b.label}
          variant="outlined"
          sx={{
            width: 84,
            height: 52,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 0.4 }}>
            {b.label}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default function UserProfilePage() {
  const profile = demoProfile;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box sx={{ px: { xs: 2, sm: 3 }, py: { xs: 3, sm: 4 } }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: 800,
            mb: { xs: 2.5, sm: 3 },
          }}
        >
          Personal Profile
        </Typography>

        <Grid container spacing={2.5} sx={{ maxWidth: 1080, mx: "auto" }}>
          {/* Left */}
          <Grid size={{ xs: 12, md: 4 }}>
            <SidebarCard profile={profile} />
          </Grid>

          {/* Right */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={2.5}>
              <SectionCard title="Bio">
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {profile.bio}
                </Typography>
              </SectionCard>

              <SectionCard title="Core needs">
                <Bullets items={profile.coreNeeds} />
              </SectionCard>

              <SectionCard title="Frustrations">
                <Bullets items={profile.frustrations} />
              </SectionCard>

              <SectionCard title="Brands">
                <BrandsRow brands={profile.brands} />
              </SectionCard>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}