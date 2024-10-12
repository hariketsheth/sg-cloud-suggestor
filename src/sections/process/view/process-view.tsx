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
  ToggleButtonGroup
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'src/routes/hooks';
import { DashboardContent } from 'src/layouts/dashboard';

interface FormData {
  workflowType: string;
  vCPU: string;
  memory: string;
  storageType: string;
  storageSize: string;
  storagePerformance: string;
  latencySensitivity: string;
  preferredRegion: string;
  geographicLatency: string;
  complianceRequirement: string;
  dataResidency: string;
  maxBudget: string;
  pricingModel: string;
  costPriority: number;
  csrPriority: number;
  performancePriority: number;
  securityPriority: number;
}

export function ProcessView() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    workflowType: '',
    vCPU: '',
    memory: '',
    storageType: '',
    storageSize: '',
    storagePerformance: '',
    latencySensitivity: '',
    preferredRegion: '',
    geographicLatency: '',
    complianceRequirement: '',
    dataResidency: '',
    maxBudget: '',
    pricingModel: '',
    costPriority: 25,
    csrPriority: 25,
    performancePriority: 25,
    securityPriority: 25
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (name: keyof FormData) => (event: Event, value: number | number[]) => {
    setFormData({ ...formData, [name]: value as number });
  };

  const handleToggleChange = (name: keyof FormData) => (event: React.MouseEvent<HTMLElement>, value: string) => {
    if (value !== null) {
      setFormData({ ...formData, [name]: value });
    }
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
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              name="workflowType"
              value={formData.workflowType}
              onChange={handleSelectChange}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Workflow Type</MenuItem>
              <MenuItem value="Database">Database</MenuItem>
              <MenuItem value="Web Application">Web Application</MenuItem>
              <MenuItem value="Machine Learning">Machine Learning</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6">Compute</Typography>
          <TextField
            fullWidth
            name="vCPU"
            label="vCPU"
            type="number"
            value={formData.vCPU}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            name="memory"
            label="Memory (GB)"
            type="number"
            value={formData.memory}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <Typography variant="h6">Storage</Typography>
          <TextField
            fullWidth
            name="storageType"
            label="Type"
            type="number"
            value={formData.storageType}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            name="storageSize"
            label="Size (GB)"
            type="number"
            value={formData.storageSize}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            name="storagePerformance"
            label="Performance"
            type="number"
            value={formData.storagePerformance}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Latency Sensitivity</FormLabel>
            <ToggleButtonGroup
              value={formData.latencySensitivity}
              exclusive
              onChange={handleToggleChange('latencySensitivity')}
              aria-label="latency sensitivity"
            >
              <ToggleButton value="Low" aria-label="low" sx={{ color: 'green' }}>
                Low
              </ToggleButton>
              <ToggleButton value="Medium" aria-label="medium" sx={{ color: 'yellow' }}>
                Medium
              </ToggleButton>
              <ToggleButton value="High" aria-label="high" sx={{ color: 'red' }}>
                High
              </ToggleButton>
            </ToggleButtonGroup>
          </FormControl>
        </>
      )
    },
    {
      name: 'Geographic Requirements',
      content: (
        <>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              name="preferredRegion"
              value={formData.preferredRegion}
              onChange={handleSelectChange}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Preferred Region</MenuItem>
              <MenuItem value="north-america">North America</MenuItem>
              <MenuItem value="asia-pacific">Asia Pacific</MenuItem>
              <MenuItem value="europe">Europe</MenuItem>
              <MenuItem value="south-america">South America</MenuItem>
            </Select>
          </FormControl>
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Latency</FormLabel>
            <ToggleButtonGroup
              value={formData.geographicLatency}
              exclusive
              onChange={handleToggleChange('geographicLatency')}
              aria-label="geographic latency"
            >
              <ToggleButton value="Low" aria-label="low" sx={{ backgroundColor: 'green', borderRadius: '8px', color: 'white' }}>
                Low
              </ToggleButton>
              <ToggleButton value="Medium" aria-label="medium" sx={{ backgroundColor: 'yellow', borderRadius: '8px', color: 'black' }}>
                Medium
              </ToggleButton>
              <ToggleButton value="High" aria-label="high" sx={{ backgroundColor: 'red', borderRadius: '8px', color: 'white' }}>
                High
              </ToggleButton>
            </ToggleButtonGroup>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              name="complianceRequirement"
              value={formData.complianceRequirement}
              onChange={handleSelectChange}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Compliance Requirement</MenuItem>
              <MenuItem value="GDPR">GDPR</MenuItem>
              <MenuItem value="HIPAA">HIPAA</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              name="dataResidency"
              value={formData.dataResidency}
              onChange={handleSelectChange}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Data Residency</MenuItem>
              <MenuItem value="north-america">North America</MenuItem>
              <MenuItem value="asia-pacific">Asia Pacific</MenuItem>
              <MenuItem value="europe">Europe</MenuItem>
              <MenuItem value="south-america">South America</MenuItem>
            </Select>
          </FormControl>
        </>
      )
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
            value={formData.maxBudget}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              name="pricingModel"
              value={formData.pricingModel}
              onChange={handleSelectChange}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Pricing Model</MenuItem>
              <MenuItem value="on-demand">On-demand</MenuItem>
              <MenuItem value="spot">Spot</MenuItem>
              <MenuItem value="reserved">Reserved</MenuItem>
            </Select>
          </FormControl>
        </>
      )
    },
    {
      name: 'Business Priorities',
      content: (
        <>
          <Typography variant="h6">Cost Priority</Typography>
          <Slider
            value={formData.costPriority}
            onChange={handleSliderChange('costPriority')}
            aria-labelledby="cost-priority-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={100}
            sx={{ mb: 3 }}
          />
          <Typography variant="h6">CSR Priority</Typography>
          <Slider
            value={formData.csrPriority}
            onChange={handleSliderChange('csrPriority')}
            aria-labelledby="csr-priority-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={100}
            sx={{ mb: 3 }}
          />
          <Typography variant="h6">Performance Priority</Typography>
          <Slider
            value={formData.performancePriority}
            onChange={handleSliderChange('performancePriority')}
            aria-labelledby="performance-priority-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={100}
            sx={{ mb: 3 }}
          />
          <Typography variant="h6">Security Priority</Typography>
          <Slider
            value={formData.securityPriority}
            onChange={handleSliderChange('securityPriority')}
            aria-labelledby="security-priority-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={100}
            sx={{ mb: 3 }}
          />
        </>
      )
    }
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
            <StepButton onClick={() => handleStageClick(index)}>
              {stage.name}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <Card sx={{ p: 3 }}>
        <Box component="form" noValidate autoComplete="off">
          <Grid container>
            {stages[currentStage].content}
          </Grid>
          <Box display="flex" justifyContent="space-between" mt={3}>
            {currentStage > 0 && (
              <Button variant="contained" onClick={handlePrevious}>
                Previous
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