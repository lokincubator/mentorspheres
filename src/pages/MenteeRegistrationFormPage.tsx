// src/pages/MenteeIntakeForm.tsx
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

type MenteeIntakeValues = {
  // Step 1: Professional Background
  current_role: string;
  professional_experience: string;
  years_of_experience: string;

  // Step 2: Areas of Interest
  interest_domains: string;
  skills_to_learn: string;

  // Step 3: Career Goals
  career_goals: string;
  milestones_with_mentor: string;

  // Step 4: Achievements and Challenges
  recent_achievements: string;
  current_challenges: string;

  // Step 5: Availability
  hours_per_week: string;
  preferred_days_times: string;

  // Step 6: Learning Style
  learning_style: string;
  mentor_expectations: string;

  // Step 7: Expectations from Mentorship
  hope_to_gain: string;
  advice_topics: string;

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

export default function MenteeIntakeFormPage() {
  const steps = useMemo(
    () => [
      "Your Professional Background",
      "Areas of Interest",
      "Career Goals",
      "Achievements and Challenges",
      "Availability",
      "Learning Style",
      "Expectations from Mentorship",
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
  } = useForm<MenteeIntakeValues>({
    defaultValues: {
      current_role: "",
      professional_experience: "",
      years_of_experience: "",
      interest_domains: "",
      skills_to_learn: "",
      career_goals: "",
      milestones_with_mentor: "",
      recent_achievements: "",
      current_challenges: "",
      hours_per_week: "",
      preferred_days_times: "",
      learning_style: "",
      mentor_expectations: "",
      hope_to_gain: "",
      advice_topics: "",
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
    console.log("Mentee intake submit:", values);
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
            Mentee Profile Creation
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
            {/* Step 1 */}
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
                  Please describe your professional experience and current field of work.
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

            {/* Step 2 */}
            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Areas of Interest
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  What specific fields or domains are you most interested in developing your skills or knowledge?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="e.g., Software Development, Marketing, Finance, etc."
                  {...register("interest_domains")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  Are there particular skills or technologies you want to learn more about?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("skills_to_learn")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {/* Step 3 */}
            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Career Goals
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  What are your short-term and long-term career goals?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("career_goals")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  Are there specific milestones you want to achieve with the help of a mentor?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("milestones_with_mentor")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {/* Step 4 */}
            {activeStep === 3 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Achievements and Challenges
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  Could you share some of your recent achievements in your career or education?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("recent_achievements")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  What are the main challenges you're currently facing in your professional journey?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("current_challenges")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {/* Step 5 */}
            {activeStep === 4 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Availability
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  How many hours per week can you dedicate to mentoring sessions?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("hours_per_week")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  Are there any specific days or times that work best for you to connect with a mentor?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("preferred_days_times")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {/* Step 6 */}
            {activeStep === 5 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Learning Style
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  How do you prefer to receive guidance?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="e.g., structured lessons, open discussions, project-based learning, etc."
                  {...register("learning_style")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  What do you expect from your mentor during the mentoring process?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("mentor_expectations")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {/* Step 7 */}
            {activeStep === 6 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Expectations from Mentorship
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  What do you hope to gain from a mentoring relationship?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("hope_to_gain")}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />

                <Typography sx={{ mb: 1.5 }}>
                  Are there particular topics or areas where you’re seeking advice or guidance?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("advice_topics")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {/* Step 8 */}
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
                  Are you open to using different communication tools based on the mentor’s preference?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Please type here"
                  {...register("open_to_other_tools")}
                  sx={{ ...fieldSx }}
                />
              </Box>
            )}

            {/* Step 9 */}
            {activeStep === 8 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Personal Interests
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  Do you have any hobbies or interests that you'd like to share with your mentor?
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

            {/* Step 10 */}
            {activeStep === 9 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Additional Information
                </Typography>

                <Typography sx={{ mb: 1.5 }}>
                  Is there anything else you’d like to share that would help us match you with the right mentor?
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
                    console.log("Mentee intake step values:", getValues());
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
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </StepperWrap>
      </Container>
    </Box>
  );
}