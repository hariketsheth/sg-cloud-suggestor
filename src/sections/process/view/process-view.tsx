import { useState, useCallback } from 'react';
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  FormLabel,
  Select,
  Button,
  Card,
  Grid,
  Slider,
  Stepper,
  Step,
  StepButton,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'src/routes/hooks';
import { DashboardContent } from 'src/layouts/dashboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FormData {
  operatingSystem: string;
  cloudProviders: any;
  criticality: any;
  baseline: number;
  peak: number;
  spikeDays: any;
  workloadSpike: string;
  workflowType: string;
  computes: Compute[];
  storageType: string;
  storageSize: string;
  storagePerformance: string;
  latencySensitivity: string;
  preferredRegion: string;
  complianceRequirement: string;
  dataResidency: string;
  maxBudget: string;
  pricingModel: string;
  costPriority: number;
  csrPriority: number;
  performancePriority: number;
  securityPriority: number;
  numberOfHits: number;
}

interface Compute {
  id: number;
  name: string;
  vCPU: string;
  memory: string;
}

interface Workload {
  id: number;
  name: string;
  formData: FormData;
}

export function ProcessView() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [workloadCount, setWorkloadCount] = useState<number>(1);
  const [workloads, setWorkloads] = useState<Workload[]>([
    {
      id: 1,
      name: 'Workload 1',
      formData: {
        workflowType: '',
        computes: [{ id: 1, name: 'Compute 1', vCPU: '', memory: '' }],
        storageType: '',
        storageSize: '',
        storagePerformance: '',
        latencySensitivity: '',
        preferredRegion: '',
        complianceRequirement: '',
        dataResidency: '',
        maxBudget: '',
        pricingModel: '',
        criticality: '',
        costPriority: 25,
        csrPriority: 25,
        performancePriority: 25,
        securityPriority: 25,
        workloadSpike: '',
        baseline: 0,
        peak: 0,
        spikeDays: [],
        numberOfHits: 0,
        cloudProviders: ['Azure', 'AWS', 'On-Premises'],
        operatingSystem: '',
      },
    },
  ]);
  const handleChange = (
    workloadId: number,
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setWorkloads((prevWorkloads) =>
      prevWorkloads.map((workload) =>
        workload.id === workloadId
          ? { ...workload, formData: { ...workload.formData, [name]: value } }
          : workload
      )
    );
  };

  const handleSelectChange = (workloadId: number, e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setWorkloads((prevWorkloads) =>
      prevWorkloads.map((workload) =>
        workload.id === workloadId
          ? { ...workload, formData: { ...workload.formData, [name]: value } }
          : workload
      )
    );
  };

  const handleSliderChange =
    (workloadId: number, name: keyof FormData) => (event: Event, value: number | number[]) => {
      setWorkloads((prevWorkloads) =>
        prevWorkloads.map((workload) =>
          workload.id === workloadId
            ? { ...workload, formData: { ...workload.formData, [name]: value as number } }
            : workload
        )
      );
    };

  const handleToggleChange =
    (workloadId: number, name: keyof FormData) =>
    (event: React.MouseEvent<HTMLElement>, value: string) => {
      if (value !== null) {
        setWorkloads((prevWorkloads) =>
          prevWorkloads.map((workload) =>
            workload.id === workloadId
              ? { ...workload, formData: { ...workload.formData, [name]: value } }
              : workload
          )
        );
      }
    };

  const handleComputeChange = (workloadId: number, field: keyof Compute, value: string) => {
    setWorkloads((prevWorkloads) =>
      prevWorkloads.map((workload) =>
        workload.id === workloadId
          ? {
              ...workload,
              formData: {
                ...workload.formData,
                computes: [
                  {
                    ...workload.formData.computes[0],
                    [field]: value,
                  },
                ],
              },
            }
          : workload
      )
    );
  };

  const handleSpikeChange = (workloadId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkloads((prevWorkloads) =>
      prevWorkloads.map((workload) =>
        workload.id === workloadId
          ? { ...workload, formData: { ...workload.formData, [name]: value } }
          : workload
      )
    );
  };

  const handleSpikeDaysChange = (workloadId: number, day: string) => {
    setWorkloads((prevWorkloads) =>
      prevWorkloads.map((workload) =>
        workload.id === workloadId
          ? {
              ...workload,
              formData: {
                ...workload.formData,
                spikeDays: workload.formData.spikeDays.includes(day)
                  ? workload.formData.spikeDays.filter((d: any) => d !== day)
                  : [...workload.formData.spikeDays, day],
              },
            }
          : workload
      )
    );
  };

  const handleAddWorkload = () => {
    const newWorkload = {
      id: workloadCount + 1,
      name: `Workload ${workloadCount + 1}`,
      formData: {
        operatingSystem: '',
        workflowType: '',
        computes: [{ id: 1, name: 'Compute 1', vCPU: '', memory: '' }],
        storageType: '',
        storageSize: '',
        storagePerformance: '',
        latencySensitivity: '',
        preferredRegion: '',
        criticality: '',
        geographicLatency: '',
        complianceRequirement: '',
        dataResidency: '',
        maxBudget: '',
        pricingModel: '',
        costPriority: 25,
        csrPriority: 25,
        performancePriority: 25,
        securityPriority: 25,
        workloadSpike: '',
        baseline: 0,
        peak: 0,
        spikeDays: [],
        numberOfHits: 0,
        cloudProviders: ['Azure', 'AWS', 'On-Premises'],
      },
    };
    setWorkloads([...workloads, newWorkload]);
    setWorkloadCount(workloadCount + 1);
  };
  const handleCloudProviderChange = (workloadId: number, provider: string) => {
    setWorkloads((prevWorkloads) =>
      prevWorkloads.map((workload) =>
        workload.id === workloadId
          ? {
              ...workload,
              formData: {
                ...workload.formData,
                cloudProviders: workload.formData.cloudProviders.includes(provider)
                  ? workload.formData.cloudProviders.filter((p: any) => p !== provider)
                  : [...workload.formData.cloudProviders, provider],
              },
            }
          : workload
      )
    );
  };
  const handleNext = () => {
    setCurrentStage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStage((prev) => prev - 1);
  };

  const handleStageClick = (index: number) => {
    setCurrentStage(index);
  };

  const handleSubmit = useCallback(() => {
    router.push('/');
  }, [router]);

  const stages = [
    {
      name: 'Workload Requirements',
      content: (
        <>
          {workloads.map((workload) => (
            <Accordion key={workload.id} sx={{ mb: 3 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{workload.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Select
                    name="workflowType"
                    value={workload.formData.workflowType}
                    onChange={(e) => handleSelectChange(workload.id, e)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select Workflow Type
                    </MenuItem>
                    <MenuItem value="Database">Database</MenuItem>
                    <MenuItem value="Web Application">Web Application</MenuItem>
                    <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>

                {(workload.formData.workflowType === 'Machine Learning' ||
                  workload.formData.workflowType === 'Web Application') && (
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <Select
                      name="operatingSystem"
                      value={workload.formData.operatingSystem}
                      onChange={(e) => handleSelectChange(workload.id, e)}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select Operating System
                      </MenuItem>
                      <MenuItem value="Windows">Windows</MenuItem>
                      <MenuItem value="Linux">Linux</MenuItem>
                      <MenuItem value="Unix">Unix</MenuItem>
                      <MenuItem value="RedHat (RHEL)">RedHat (RHEL)</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                    </Select>
                  </FormControl>
                )}

                <Typography variant="h6">Compute</Typography>
                <TextField
                  fullWidth
                  name="vCPU"
                  label="vCPU"
                  type="number"
                  value={workload.formData.computes[0].vCPU}
                  onChange={(e) => handleComputeChange(workload.id, 'vCPU', e.target.value)}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  name="memory"
                  label="Memory (GB)"
                  type="number"
                  value={workload.formData.computes[0].memory}
                  onChange={(e) => handleComputeChange(workload.id, 'memory', e.target.value)}
                  sx={{ mb: 3 }}
                />

                <Typography variant="h6">Storage</Typography>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Select
                    name="storageType"
                    value={workload.formData.storageType}
                    onChange={(e) => handleSelectChange(workload.id, e)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select Storage Type
                    </MenuItem>
                    <MenuItem value="Relational">Relational</MenuItem>
                    <MenuItem value="Non-relational">Non-relational</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  name="storageSize"
                  label="Size (GB)"
                  type="number"
                  value={workload.formData.storageSize}
                  onChange={(e) => handleChange(workload.id, e)}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  name="storagePerformance"
                  label="Performance"
                  type="number"
                  value={workload.formData.storagePerformance}
                  onChange={(e) => handleChange(workload.id, e)}
                  sx={{ mb: 3 }}
                />
                <FormControl component="fieldset" sx={{ mb: 3 }}>
                  <FormLabel component="legend">Latency Sensitivity</FormLabel>
                  <ToggleButtonGroup
                    value={workload.formData.latencySensitivity}
                    exclusive
                    onChange={(e, value) =>
                      handleToggleChange(workload.id, 'latencySensitivity')(e, value)
                    }
                    aria-label="latency sensitivity"
                  >
                    <ToggleButton
                      value="Low"
                      aria-label="low"
                      sx={{ backgroundColor: 'green', borderRadius: '8px', color: 'white' }}
                    >
                      Low
                    </ToggleButton>
                    <ToggleButton
                      value="Medium"
                      aria-label="medium"
                      sx={{ backgroundColor: 'yellow', borderRadius: '8px', color: 'black' }}
                    >
                      Medium
                    </ToggleButton>
                    <ToggleButton
                      value="High"
                      aria-label="high"
                      sx={{ backgroundColor: 'red', borderRadius: '8px', color: 'white' }}
                    >
                      High
                    </ToggleButton>
                  </ToggleButtonGroup>
                </FormControl>
                <br />
                <FormControl component="fieldset" sx={{ mb: 3 }}>
                  <FormLabel component="legend">Workload Spike</FormLabel>
                  <RadioGroup
                    name="workloadSpike"
                    value={workload.formData.workloadSpike}
                    onChange={(e) => handleSpikeChange(workload.id, e)}
                  >
                    <FormControlLabel value="Constant" control={<Radio />} label="Constant" />
                    <FormControlLabel value="Daily" control={<Radio />} label="Daily" />
                    <FormControlLabel value="Weekly" control={<Radio />} label="Weekly" />
                    <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
                  </RadioGroup>
                </FormControl>

                {workload.formData.workloadSpike && (
                  <>
                    <TextField
                      fullWidth
                      name="baseline"
                      label="Baseline (Minimum instances required)"
                      type="number"
                      value={workload.formData.baseline}
                      onChange={(e) => handleChange(workload.id, e)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      name="peak"
                      label="Peak (Maximum instances required during spike)"
                      type="number"
                      value={workload.formData.peak}
                      onChange={(e) => handleChange(workload.id, e)}
                      sx={{ mb: 3 }}
                    />
                  </>
                )}

                {workload.formData.workloadSpike === 'Daily' && (
                  <FormControl component="fieldset" sx={{ mb: 3 }}>
                    <FormLabel component="legend">Spike Days</FormLabel>
                    <Box>
                      {[
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                      ].map((day) => (
                        <FormControlLabel
                          key={day}
                          control={
                            <Checkbox
                              checked={workload.formData.spikeDays.includes(day)}
                              onChange={() => handleSpikeDaysChange(workload.id, day)}
                            />
                          }
                          label={day}
                        />
                      ))}
                    </Box>
                  </FormControl>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      ),
    },
    {
      name: 'Cost Preferences',
      content: (
        <>
          <TextField
            fullWidth
            name="maxBudget"
            label="Maximum Budget"
            type="number"
            value={workloads[0].formData.maxBudget}
            onChange={(e) => handleChange(workloads[0].id, e)}
            sx={{ mb: 3 }}
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              name="pricingModel"
              value={workloads[0].formData.pricingModel}
              onChange={(e) => handleSelectChange(workloads[0].id, e)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Pricing Model
              </MenuItem>
              <MenuItem value="on-demand">On-demand</MenuItem>
              <MenuItem value="spot">Spot</MenuItem>
              <MenuItem value="reserved">Reserved</MenuItem>
            </Select>
          </FormControl>
        </>
      ),
    },
    {
      name: 'Business Preferences',
      content: (
        <>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              name="preferredRegion"
              value={workloads[0].formData.preferredRegion}
              onChange={(e) => handleSelectChange(workloads[0].id, e)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Preferred Region
              </MenuItem>
              <MenuItem value="north-america">North America</MenuItem>
              <MenuItem value="asia-pacific">Asia Pacific</MenuItem>
              <MenuItem value="europe">Europe</MenuItem>
              <MenuItem value="south-america">South America</MenuItem>
            </Select>
          </FormControl>
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Criticality</FormLabel>
            <ToggleButtonGroup
              value={workloads[0].formData.criticality}
              exclusive
              onChange={(e, value) => handleToggleChange(workloads[0].id, 'criticality')(e, value)}
              aria-label="geographic latency"
            >
              <ToggleButton
                value="Low"
                aria-label="low"
                sx={{ backgroundColor: 'green', borderRadius: '8px', color: 'white' }}
              >
                Low
              </ToggleButton>
              <ToggleButton
                value="Medium"
                aria-label="medium"
                sx={{ backgroundColor: 'yellow', borderRadius: '8px', color: 'black' }}
              >
                Medium
              </ToggleButton>
              <ToggleButton
                value="High"
                aria-label="high"
                sx={{ backgroundColor: 'red', borderRadius: '8px', color: 'white' }}
              >
                High
              </ToggleButton>
            </ToggleButtonGroup>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              name="complianceRequirement"
              value={workloads[0].formData.complianceRequirement}
              onChange={(e) => handleSelectChange(workloads[0].id, e)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Compliance Requirement
              </MenuItem>
              <MenuItem value="GDPR">GDPR</MenuItem>
              <MenuItem value="HIPAA">HIPAA</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              name="dataResidency"
              value={workloads[0].formData.dataResidency}
              onChange={(e) => handleSelectChange(workloads[0].id, e)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Data Residency
              </MenuItem>
              <MenuItem value="north-america">North America</MenuItem>
              <MenuItem value="asia-pacific">Asia Pacific</MenuItem>
              <MenuItem value="europe">Europe</MenuItem>
              <MenuItem value="south-america">South America</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            name="numberOfHits"
            label="Number of hits/day"
            type="number"
            inputProps={{ min: 0 }}
            value={workloads[0].formData.numberOfHits}
            onChange={(e) => handleChange(workloads[0].id, e)}
            sx={{ mb: 3 }}
          />
<Grid container spacing={3}>
  <Grid item xs={12}>
  <FormControl component="fieldset" sx={{ mb: 3 }}>
  <FormLabel component="legend">Cloud Provider</FormLabel>
  <Grid container spacing={2}>
    <Grid item>
      <FormControlLabel
        control={
          <Checkbox
            checked={workloads[0].formData.cloudProviders.includes('Azure')}
            onChange={() => handleCloudProviderChange(workloads[0].id, 'Azure')}
          />
        }
        label="Azure"
      />
    </Grid>
    <Grid item>
      <FormControlLabel
        control={
          <Checkbox
            checked={workloads[0].formData.cloudProviders.includes('AWS')}
            onChange={() => handleCloudProviderChange(workloads[0].id, 'AWS')}
          />
        }
        label="AWS"
      />
    </Grid>
    <Grid item>
      <FormControlLabel
        control={
          <Checkbox
            checked={workloads[0].formData.cloudProviders.includes('On-Premises')}
            onChange={() => handleCloudProviderChange(workloads[0].id, 'On-Premises')}
          />
        }
        label="On-Premises"
      />
    </Grid>
  </Grid>
</FormControl>
  </Grid>

  <Grid item xs={12}>
    <Box mt={2}>
      <Typography variant="h5" gutterBottom>
        Priorities
      </Typography>
      <Typography variant="h6">Cost Priority</Typography>
      <Slider
        value={workloads[0].formData.costPriority}
        onChange={(e, value) => handleSliderChange(workloads[0].id, 'costPriority')(e, value)}
        aria-labelledby="cost-priority-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={100}
        sx={{ mb: 3 }}
      />
      <Typography variant="h6">Performance Priority</Typography>
      <Slider
        value={workloads[0].formData.performancePriority}
        onChange={(e, value) => handleSliderChange(workloads[0].id, 'performancePriority')(e, value)}
        aria-labelledby="performance-priority-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={100}
        sx={{ mb: 3 }}
      />
    </Box>
  </Grid>
</Grid>
        </>
      ),
    },
  ];

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          {stages[currentStage].name}
        </Typography>
      </Box>

      <Stepper nonLinear activeStep={currentStage} sx={{ mb: 5 }}>
        {stages.map((stage, index) => (
          <Step key={stage.name}>
            <StepButton onClick={() => handleStageClick(index)}>{stage.name}</StepButton>
          </Step>
        ))}
      </Stepper>

      <Card sx={{ p: 3 }}>
        <Box component="form" noValidate autoComplete="off">
          <Grid container>{stages[currentStage].content}</Grid>
          <Box display="flex" justifyContent="space-between" mt={3}>
            {currentStage > 0 ? (
              <Button variant="contained" onClick={handlePrevious}>
                Previous
              </Button>
            ) : (
              <Button variant="outlined" onClick={handleAddWorkload}>
                Add new Workload
              </Button>
            )}
            {currentStage < stages.length - 1 ? (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <LoadingButton
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                onClick={handleSubmit}
              >
                Submit
              </LoadingButton>
            )}
          </Box>
        </Box>
      </Card>
    </DashboardContent>
  );
}
