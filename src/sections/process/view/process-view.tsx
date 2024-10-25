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
  IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'src/routes/hooks';
import { DashboardContent } from 'src/layouts/dashboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

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
  numberOfHits: number;
  resourceTracker: string;
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
  const [selectedOption, setSelectedOption] = useState('preferredRegion');
  const [preferredRegion, setPreferredRegion] = useState('');
  const [userSpreadRegions, setUserSpreadRegions] = useState<string[]>([]);
  const [newRegion, setNewRegion] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editRegion, setEditRegion] = useState('');
  const [expanded, setExpanded] = useState<number | false>(1);

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
        workloadSpike: '',
        baseline: 0,
        peak: 0,
        spikeDays: [],
        numberOfHits: 0,
        cloudProviders: ['Azure', 'AWS', 'On-Premises'],
        operatingSystem: '',
        resourceTracker: '',
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

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handlePreferredRegionChange = (event: SelectChangeEvent<string>) => {
    setPreferredRegion(event.target.value as string);
  };

  const handleNewRegionChange = (event: SelectChangeEvent<string>) => {
    setNewRegion(event.target.value as string);
  };

  const addRegion = () => {
    if (newRegion && !userSpreadRegions.includes(newRegion)) {
      setUserSpreadRegions([...userSpreadRegions, newRegion]);
      setNewRegion('');
    }
  };
  const handleEditRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditRegion(event.target.value);
  };

  const saveEditRegion = (index: number) => {
    const updatedRegions = [...userSpreadRegions];
    updatedRegions[index] = editRegion;
    setUserSpreadRegions(updatedRegions);
    setEditIndex(null);
    setEditRegion('');
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

  const handleResourceChange = (workloadId: number, e: React.ChangeEvent<HTMLInputElement>) => {
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
        workloadSpike: '',
        baseline: 0,
        peak: 0,
        spikeDays: [],
        numberOfHits: 0,
        cloudProviders: ['Azure', 'AWS', 'On-Premises'],
        resourceTracker: '',
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

  const handleWorkloadNameChange = (id: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedWorkloads = workloads.map((workload) =>
      workload.id === id ? { ...workload, name: event.target.value } : workload
    );
    setWorkloads(updatedWorkloads);
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
    router.push('/output');
  }, [router]);

  const handleAccordionChange = (id: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? id : false);
  };

  const stages = [
    {
      name: 'Workload Requirements',
      content: (
        <>
          {workloads.map((workload) => (
            <Accordion key={workload.id}           expanded={expanded === workload.id}
            onChange={handleAccordionChange(workload.id)} sx={{ mb: 3 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{workload.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <TextField
              label="Workload Name"
              value={workload.name}
              onChange={(e) => handleWorkloadNameChange(workload.id, e)}
              fullWidth
              sx={{ mb: 3 }}
            />
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Select
                    name="workflowType"
                    value={workload.formData.workflowType}
                    onChange={(e) => handleSelectChange(workload.id, e)}
                    displayEmpty
                    required
                  >
                    <MenuItem value="" disabled>
                      Select Workflow Type
                    </MenuItem>
                    <MenuItem value="Database">Database</MenuItem>
                    <MenuItem value="Web Application">Web Application</MenuItem>
                    <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                    <MenuItem value="Orchestrated Container">Orchestrated Container</MenuItem>
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
                  required
                />
                <TextField
                  fullWidth
                  name="memory"
                  label="Memory (GB)"
                  type="number"
                  value={workload.formData.computes[0].memory}
                  onChange={(e) => handleComputeChange(workload.id, 'memory', e.target.value)}
                  sx={{ mb: 3 }}
                  required
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
                  name="storagePerformance"
                  label="vCPU"
                  type="number"
                  value={workload.formData.storagePerformance}
                  onChange={(e) => handleChange(workload.id, e)}
                  sx={{ mb: 3 }}
                  required
                />
                <TextField
                  fullWidth
                  name="storageSize"
                  label="Size (GB)"
                  type="number"
                  value={workload.formData.storageSize}
                  onChange={(e) => handleChange(workload.id, e)}
                  sx={{ mb: 3 }}
                  required
                />
          
                <FormControl component="fieldset" sx={{ mb: 3 }} required>
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
                {/*
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
                */}
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
              required
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
          <Box>
            <FormControl component="fieldset">
              <RadioGroup row value={selectedOption} onChange={handleOptionChange}>
                <FormControlLabel
                  value="preferredRegion"
                  control={<Radio />}
                  label="Preferred Region"
                />
                <FormControlLabel value="userSpread" control={<Radio />} label="User Spread" />
              </RadioGroup>
            </FormControl>

            {selectedOption === 'preferredRegion' && (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Select
                  name="preferredRegion"
                  value={preferredRegion}
                  onChange={handlePreferredRegionChange}
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
            )}

            {selectedOption === 'userSpread' && (
              <Box>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Select
                    name="newRegion"
                    value={newRegion}
                    onChange={handleNewRegionChange}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select Region to Add
                    </MenuItem>
                    <MenuItem value="North America">North America</MenuItem>
                    <MenuItem value="Asia Pacific">Asia Pacific</MenuItem>
                    <MenuItem value="Europe">Europe</MenuItem>
                    <MenuItem value="South America">South America</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" onClick={addRegion}>
                  Add Region
                </Button>
                <Box sx={{ mt: 2 }}>
                  {userSpreadRegions.map((region, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {editIndex === index ? (
                        <>
                          <TextField
                            value={editRegion}
                            onChange={handleEditRegionChange}
                            sx={{ mr: 1 }}
                          />
                          <IconButton onClick={() => saveEditRegion(index)}>
                            <SaveIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <Box sx={{ mr: 1 }}>
                            {index + 1}. {region}
                          </Box>
                          <IconButton
                            onClick={() => {
                              setEditIndex(index);
                              setEditRegion(region);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            <FormControl component="fieldset" sx={{ mb: 3 }} required>
              <FormLabel component="legend">Criticality</FormLabel>
              <ToggleButtonGroup
                value={workloads[0].formData.criticality}
                exclusive
                onChange={(e, value) =>
                  handleToggleChange(workloads[0].id, 'criticality')(e, value)
                }
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
          </Box>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              name="complianceRequirement"
              value={workloads[0].formData.complianceRequirement}
              onChange={(e) => handleSelectChange(workloads[0].id, e)}
              displayEmpty
              required
            >
              <MenuItem value="" disabled>
                Select Compliance Requirement
              </MenuItem>
              <MenuItem value="GDPR">GDPR</MenuItem>
              <MenuItem value="HIPAA">HIPAA</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
              <MenuItem value="None">None</MenuItem>
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
            label="Number of users/day(max)"
            type="number"
            inputProps={{ min: 0 }}
            value={workloads[0].formData.numberOfHits}
            onChange={(e) => handleChange(workloads[0].id, e)}
            sx={{ mb: 3 }}
            required
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
              <Grid>
                <FormControl component="fieldset" sx={{ mb: 3 }}>
                  <FormLabel component="legend">Track Resources</FormLabel>
                  <RadioGroup
                    name="resourceTracker"
                    value={workloads[0].formData.resourceTracker}
                    onChange={(e) => handleResourceChange(workloads[0].id, e)}
                  >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </Grid>
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
