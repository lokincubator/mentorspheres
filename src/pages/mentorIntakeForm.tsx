// src/pages/LoginPage.tsx
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// ---- Types ----

type MentorIntakeValues = {
  // Step 1: Professional Background
  current_role: string;
  professional_experience: string;
  years_of_experience: string;

  // Step 2: Areas of Expertise
  expertise_domains: string;
  specializations: string;

  // Step 3: Key Achievements
  notable_achievements: string;
  awards_certifications: string;

  // Step 4: Mentoring Experience
  mentoring_duration: string;
  mentoring_rewarding_aspects: string;

  // Step 5: Availability
  hours_per_week: string;
  preferred_days_times: string;

  // Step 6: Mentoring Style
  mentoring_style: string;
  mentee_expectations: string;

  // Step 7: Goals as a Mentor
  mentoring_goals: string;
  mentee_types_best_fit: string;

  // Step 8: Preferred Communication Channels
  preferred_communication: string;
  open_to_other_tools: string;

  // Step 9: Personal Interests
  hobbies_interests: string;
  non_professional_topics: string;

  // Step 10: Additional Information
  additional_information: string;
};

// ---- Styling helpers (matches the red stepper + clean layout in your screenshots) ----

const BRAND_RED = "#B00020";

const StepperWrap = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "none",
  border: `1px solid ${theme.palette.divider}`,
}));

function RedStepIcon(props: any) {
  const { active, completed, icon, className } = props;

  return (
    <Box
      className={className}
      sx={{
        width: 28,
        height: 28,
        borderRadius: "999px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 13,
        border: `2px solid ${completed || active ? BRAND_RED : "#E5E7EB"}`,
        color: completed || active ? "#fff" : "#9CA3AF",
        backgroundColor: completed || active ? BRAND_RED : "#fff",
        transition: "all 150ms ease",
      }}
    >
      {icon}
    </Box>
  );
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 1.5,
    backgroundColor: "#fff",
  },
};

export default function MentorIntakeForm() {
  const steps = useMemo(
    () => [
      "Your Professional Background",
      "Areas of Expertise",
      "Key Achievements",
      "Mentoring Experience",
      "Availability",
      "Mentoring Style",
      "Goals as a Mentor",
      "Preferred Communication Channels",
      "Personal Interests",
      "Additional Information",
    ],
    []
  );

  const [activeStep, setActiveStep] = useState(0);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm<MentorIntakeValues>({
    defaultValues: {
      current_role: "",
      professional_experience: "",
      years_of_experience: "",
      expertise_domains: "",
      specializations: "",
      notable_achievements: "",
      awards_certifications: "",
      mentoring_duration: "",
      mentoring_rewarding_aspects: "",
      hours_per_week: "",
      preferred_days_times: "",
      mentoring_style: "",
      mentee_expectations: "",
      mentoring_goals: "",
      mentee_types_best_fit: "",
      preferred_communication: "",
      open_to_other_tools: "",
      hobbies_interests: "",
      non_professional_topics: "",
      additional_information: "",
    },
    mode: "onTouched",
  });

  const goNext = () => setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  const onSubmit = handleSubmit(async (values) => {
    // TODO: Wire this up to your API
    // For now we log a clean payload.
    console.log("Mentor intake submit:", values);
  });

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        <StepperWrap>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: 800,
              fontStyle: "italic",
              mb: { xs: 3, md: 4 },
            }}
          >
            Mentor Profile Creation
          </Typography>

          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              mb: { xs: 4, md: 6 },
              "& .MuiStepConnector-line": {
                borderColor: "#E5E7EB",
                borderTopWidth: 3,
                borderRadius: 999,
              },
              "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line, & .MuiStepConnector-root.Mui-completed .MuiStepConnector-line":
                {
                  borderColor: BRAND_RED,
                },
              "& .MuiStepLabel-label": { display: "none" },
            }}
          >
            {steps.map((_, index) => (
              <Step key={index}>
                <StepLabel StepIconComponent={RedStepIcon} />
              </Step>
            ))}
          </Stepper>

          <Box component="form" onSubmit={onSubmit} noValidate>
            {/* Step content */}
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Your Professional Background
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  What is your current job title or role?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Your job title or role"
                  {...register("current_role")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  Please describe your professional experience and expertise in your field.
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Your professional experience"
                  {...register("professional_experience")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  How many years of experience do you have in your industry?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Your years of experience"
                  {...register("years_of_experience")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Areas of Expertise
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  Which specific fields or domains are you most knowledgeable in?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="e.g., Software Development, Product Management, etc."
                  {...register("expertise_domains")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  Have you specialized in any particular tools, methodologies, or practices?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("specializations")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Key Achievements
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  Could you share some of your notable achievements in your career?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("notable_achievements")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  Have you received any awards, recognitions, or certifications?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("awards_certifications")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {activeStep === 3 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Mentoring Experience
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  Have you mentored others before? If yes, for how long?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("mentoring_duration")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  What aspects of mentoring do you find most rewarding?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("mentoring_rewarding_aspects")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {activeStep === 4 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Availability
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  How many hours per week are you available to dedicate to mentoring?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("hours_per_week")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  Are there any specific days or times that work best for you to connect with a mentee?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("preferred_days_times")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {activeStep === 5 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Mentoring Style
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  How would you describe your mentoring style?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="e.g., hands-on, advisory, guiding, etc."
                  {...register("mentoring_style")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  What do you expect from your mentee during the mentoring process?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("mentee_expectations")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {activeStep === 6 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Goals as a Mentor
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  What do you hope to achieve through mentoring?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("mentoring_goals")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  Are there particular types of mentees you feel you can help the most?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("mentee_types_best_fit")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {activeStep === 7 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Preferred Communication Channels
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  How do you prefer to communicate with your mentee?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="e.g., email, video calls, in-person meetings, etc."
                  {...register("preferred_communication")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  Are you open to using different communication tools based on the mentee’s preference?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("open_to_other_tools")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {activeStep === 8 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Personal Interests
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  Do you have any hobbies or interests that you'd like to share with your mentee?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("hobbies_interests")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  Are there non-professional topics you'd be interested in discussing?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("non_professional_topics")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {activeStep === 9 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Additional Information
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  Is there anything else you’d like to share that would help us match you with the right mentee?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("additional_information")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {/* Footer buttons */}
            <Box
              sx={{
                mt: { xs: 4, md: 6 },
                display: "flex",
                justifyContent: "flex-start",
                gap: 2,
              }}
            >
              {activeStep > 0 && (
                <Button
                  type="button"
                  variant="outlined"
                  onClick={goBack}
                  sx={{
                    borderColor: BRAND_RED,
                    color: BRAND_RED,
                    fontWeight: 700,
                    px: 3,
                    py: 1.2,
                    borderRadius: 2,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: BRAND_RED,
                      backgroundColor: "rgba(176, 0, 32, 0.06)",
                    },
                  }}
                >
                  Previous
                </Button>
              )}

              {activeStep < steps.length - 1 ? (
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => {
                    // keep values, just advance
                    console.log("Mentor intake step values:", getValues());
                    goNext();
                  }}
                  sx={{
                    backgroundColor: BRAND_RED,
                    fontWeight: 800,
                    px: 3,
                    py: 1.2,
                    borderRadius: 2,
                    textTransform: "none",
                    "&:hover": { backgroundColor: BRAND_RED },
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: BRAND_RED,
                    fontWeight: 800,
                    px: 3,
                    py: 1.2,
                    borderRadius: 2,
                    textTransform: "none",
                    "&:hover": { backgroundColor: BRAND_RED },
                  }}
                >
                  Submit
                </Button>
              )}
            </Box>
          </Box>
        </StepperWrap>
      </Container>
    </Box>
  );
}