import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Box,
  Card,
  CardActionArea,
  Slider,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CancelIcon from '@mui/icons-material/Cancel';

import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Chart } from 'src/components/chart';
import { AnalyticsCloudProvider } from '../analytics-cloud-provider';
import { AnalyticsCloudMigration } from '../analytics-cloud-migration';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

// Define a type for the cost data
type CostData = {
  name: string;
  compute: number;
  storage: number;
  total: number;
};

// Define a type for instance details
type InstanceDetails = {
  instanceName: string;
  computeRegion: string;
  storageRegion: string;
  storageGB: number;
  vCPUs: number;
  workloadName: string;
  totalCO2?: number; // Optional property for total CO2
};

// Define a type for CSR metrics
type CSRMetrics = {
  instanceName: string;
  totalCO2: number; // Total CO2 in grams per month
};

// Define the props for the CostDetailsTable
interface CostDetailsTableProps {
  provider: string;
}
// ----------------------------------------------------------------------
// Dummy cost data
const costData: CostData[] = [
  { name: 'AWS', compute: 1619.28, storage: 1036.32, total: 2655.6 },
  { name: 'Azure', compute: 1295.4, storage: 647.76, total: 1943.16 },
  { name: 'On-Prem', compute: 998.52, storage: 1116, total: 2114.52 },
  { name: 'AWS + On-Prem', compute: 998.52, storage: 960, total: 1958.52 },
  { name: 'AWS + Azure', compute: 1619, storage: 971.64, total: 2590.64 },
  { name: 'Azure + On-Prem', compute: 998.52, storage: 1116, total: 2114.52 },
  { name: 'Multi Cloud', compute: 1295.4, storage: 647.76, total: 1943.16 },
];

const awsInstanceDetails: InstanceDetails[] = [
  {
    instanceName: 'r6i.xlarge',
    computeRegion: 'Europe',
    storageRegion: '-',
    storageGB: 32,
    vCPUs: 4,
    workloadName: 'Marley ML',
  },
  {
    instanceName: 'sb.m5.large',
    computeRegion: '-',
    storageRegion: 'Europe',
    storageGB: 8,
    vCPUs: 2,
    workloadName: 'Marley DL',
  },
];

const azureInstanceDetails: InstanceDetails[] = [
  {
    instanceName: 'Standard D4s v5',
    computeRegion: 'Europe',
    storageRegion: '-',
    storageGB: 32,
    vCPUs: 4,
    workloadName: 'Marley ML',
    totalCO2: 7.5,
  },
  {
    instanceName: 'Standard D2s v5',
    computeRegion: '-',
    storageRegion: 'Europe',
    storageGB: 8,
    vCPUs: 2,
    workloadName: 'Marley DL',
    totalCO2: 4.0,
  },
];

const onPremInstanceDetails: InstanceDetails[] = [
  {
    instanceName: 'large-mem32',
    computeRegion: 'eu-fr-paris-2',
    storageRegion: '-',
    storageGB: 32,
    vCPUs: 4,
    workloadName: 'Marley ML',
  },
  {
    instanceName: 'Postgres-OCS-2vCPU-8GB',
    computeRegion: '-',
    storageRegion: 'eu-fr-north-1',
    storageGB: 8,
    vCPUs: 2,
    workloadName: 'Marley DL',
  },
];

const awsOnPremInstanceDetailsAWS: InstanceDetails[] = [
  {
    instanceName: 'large-mem32 AO',
    computeRegion: 'eu-fr-paris-2',
    storageRegion: '-',
    storageGB: 32,
    vCPUs: 4,
    workloadName: 'Marley ML',
  },
];

const awsOnPremInstanceDetailsOnPrem: InstanceDetails[] = [
  {
    instanceName: 'db.m5.large AO',
    computeRegion: '-',
    storageRegion: 'Europe',
    storageGB: 8,
    vCPUs: 2,
    workloadName: 'Marley DL',
  },
];

const azureOnPremInstanceDetailsAzure: InstanceDetails[] = [
  {
    instanceName: 'large-mem32 AP',
    computeRegion: 'eu-fr-paris-2',
    storageRegion: '-',
    storageGB: 32,
    vCPUs: 4,
    workloadName: 'Marley ML',
  },
];

const azureOnPremInstanceDetailsOnPrem: InstanceDetails[] = [
  {
    instanceName: 'Postgres-OCS-2vCPU-8GB AP',
    computeRegion: '-',
    storageRegion: 'eu-fr-north-1',
    storageGB: 8,
    vCPUs: 2,
    workloadName: 'Marley DL',
  },
];

const awsAzureInstanceDetailsAWS: InstanceDetails[] = [
  {
    instanceName: 'large-mem32 AA',
    computeRegion: 'eu-fr-paris-2',
    storageRegion: '-',
    storageGB: 32,
    vCPUs: 4,
    workloadName: 'Marley ML',
  },
];

const awsAzureInstanceDetailsAzure: InstanceDetails[] = [
  {
    instanceName: 'db.m5.large AA',
    computeRegion: '-',
    storageRegion: 'Europe',
    storageGB: 8,
    vCPUs: 2,
    workloadName: 'Marley DL',
  },
];

const multiCloudInstanceDetails: InstanceDetails[] = [
  {
    instanceName: 'Standard D4s v5 MC',
    computeRegion: 'Europe',
    storageRegion: '-',
    storageGB: 32,
    vCPUs: 4,
    workloadName: 'Marley ML',
  },
  {
    instanceName: 'Standard D2s v5 MC',
    computeRegion: '-',
    storageRegion: 'Europe',
    storageGB: 8,
    vCPUs: 2,
    workloadName: 'Marley DL',
  },
];

// Dummy CSR metrics data
const csrMetricsData: any = [
  { instanceName: 'r6i.xlarge', cloud: 'AWS', totalCO2: 12.5 },
  { instanceName: 'sb.m5.large', cloud: 'AWS', totalCO2: 7.5 },
  { instanceName: 'large-mem32', cloud: 'On-Prem', totalCO2: 7.3 },
  { instanceName: 'Postgres-OCS-2vCPU-8GB', cloud: 'On-Prem', totalCO2: 5.8 },
  { instanceName: 'Standard D4s v5', cloud: 'Azure', totalCO2: 7.5 },
  { instanceName: 'Standard D2s v5', cloud: 'Azure', totalCO2: 4.0 },
  { instanceName: 'db.m5.large AO', cloud: 'AWS + On-Prem', totalCO2: 7.3 },
  { instanceName: 'large-mem32 AO', cloud: 'AWS + On-Prem', totalCO2: 7.5 },
  { instanceName: 'large-mem32 AA', cloud: 'AWS + Azure', totalCO2: 15.0 },
  { instanceName: 'db.m5.large AA', cloud: 'AWS + Azure', totalCO2: 8.0 },
  { instanceName: 'large-mem32 AP', cloud: 'Azure + On-Prem', totalCO2: 7.3 },
  { instanceName: 'Postgres-OCS-2vCPU-8GB AP', cloud: 'Azure + On-Prem', totalCO2: 5.8 },
  { instanceName: 'Standard D4s v5 MC', cloud: 'Multi Cloud',totalCO2: 7.5 },
  { instanceName: 'Standard D2s v5 MC', cloud: 'Multi Cloud',totalCO2: 4.0 },
];

// Table component that filters and displays cost data for a given provider
const CostDetailsTable: React.FC<CostDetailsTableProps> = ({ provider }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Provider</TableCell>
          <TableCell>Compute Cost</TableCell>
          <TableCell>Storage Cost</TableCell>
          <TableCell>Total Cost</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {costData
          .filter((data) => data.name === provider)
          .map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{`$${row.compute}`}</TableCell>
              <TableCell>{`$${row.storage}`}</TableCell>
              <TableCell>{`$${row.total}`}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
);

// InstanceDetailsTable that accepts dynamic instance data
const InstanceDetailsTable: React.FC<{ instanceDetails: InstanceDetails[] }> = ({
  instanceDetails,
}) => (
  <TableContainer component={Paper} sx={{ mt: 3 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Instance Name</TableCell>
          <TableCell>Compute Region</TableCell>
          <TableCell>Storage Region</TableCell>
          <TableCell>Storage (GB)</TableCell>
          <TableCell>vCPUs</TableCell>
          <TableCell>Workload Name</TableCell>
          <TableCell>Compliance</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {instanceDetails.map((instance) => (
          <TableRow key={instance.instanceName}>
            <TableCell>{instance.instanceName}</TableCell>
            <TableCell>{instance.computeRegion}</TableCell>
            <TableCell>{instance.storageRegion}</TableCell>
            <TableCell>{instance.storageGB}</TableCell>
            <TableCell>{instance.vCPUs}</TableCell>
            <TableCell>{instance.workloadName}</TableCell>
            <TableCell> <Chip
                          label="GDPR Compliant"
                          sx={{ ml: 1 }}
                          size="small"
                          color="success"
                        /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

// CSR Metrics Table
const CSRMetricsTable: React.FC<{ instanceDetails: InstanceDetails[] }> = ({ instanceDetails }) => (
  <TableContainer component={Paper} sx={{ mt: 3 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Instance Name</TableCell>
          <TableCell>Total CO<sub>2</sub> (g/month)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {instanceDetails.map((instance) => {
          const csrData = csrMetricsData.find((csr: any) => csr.instanceName === instance.instanceName);
          return (
            <TableRow key={instance.instanceName}>
              <TableCell>{instance.instanceName}</TableCell>
              <TableCell>{csrData ? csrData.totalCO2 : 'N/A'}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);
const csr1MetricsData: CSRMetrics[] = [
  { instanceName: 'AWS Instance A', totalCO2: 12.5 },
  { instanceName: 'AWS Instance B', totalCO2: 7.5 },
  { instanceName: 'On-Prem Instance A', totalCO2: 7.3 },
  { instanceName: 'On-Prem Instance B', totalCO2: 5.8 },
  { instanceName: 'Azure Instance A', totalCO2: 7.5 },
  { instanceName: 'Azure Instance B', totalCO2: 4.0 },
  { instanceName: 'AWS + On-Prem AWS Instance A', totalCO2: 7.3 },
  { instanceName: 'AWS + On-Prem On-Prem Instance A', totalCO2: 7.5 },
  { instanceName: 'AWS + Azure AWS Instance A', totalCO2: 15.0 },
  { instanceName: 'AWS + Azure Azure Instance B', totalCO2: 8.0 },
  { instanceName: 'Azure + On-Prem Azure Instance A', totalCO2: 7.3 },
  { instanceName: 'Azure + On-Prem On-Prem Instance B', totalCO2: 5.8 },
  { instanceName: 'Multi Cloud Instance A', totalCO2: 7.5 },
  { instanceName: 'Multi Cloud Instance B', totalCO2: 4.0 },
];

const csr2MetricsData: CSRMetrics[] = [
    { instanceName: 'AWS', totalCO2: 20.0 },
    { instanceName: 'On-Prem', totalCO2: 13.1 },
    { instanceName: 'Azure', totalCO2: 11.5 },
    { instanceName: 'AWS + On-Prem', totalCO2: 14.8 },
    { instanceName: 'AWS + Azure', totalCO2: 23.0 },
    { instanceName: 'Azure + On-Prem', totalCO2: 13.1 },
    { instanceName: 'Multi Cloud', totalCO2: 11.45 },
  ];
const calculateTotalEmissions = (instanceData: CSRMetrics[]) => {
  const totals = {
    AWS: 0,
    'On-Prem': 0,
    Azure: 0,
    'AWS + On-Prem': 0,
    'AWS + Azure': 0,
    'Azure + On-Prem': 0,
    'Multi Cloud': 0,
  };

  instanceData.forEach((data) => {
    if (data.instanceName === 'AWS Instance A' || data.instanceName === 'AWS Instance B') {
      totals.AWS += data.totalCO2;
    }
    if (data.instanceName === 'On-Prem Instance A' || data.instanceName === 'On-Prem Instance B') {
      totals['On-Prem'] += data.totalCO2;
    }
    if (data.instanceName === 'Azure Instance A' || data.instanceName === 'Azure Instance B') {
      totals.Azure += data.totalCO2;
    }
    if (
      data.instanceName === 'AWS+On-Prem AWS Instance A' ||
      data.instanceName === 'AWS+On-Prem On-Prem Instance A'
    ) {
      totals['AWS + On-Prem'] += data.totalCO2;
    }
    if (
      data.instanceName === 'AWS+Azure AWS Instance A' ||
      data.instanceName === 'AWS+Azure Azure Instance B'
    ) {
      totals['AWS + Azure'] += data.totalCO2;
    }
    if (
      data.instanceName === 'Azure+On-Prem Azure Instance A' ||
      data.instanceName === 'Azure+On-Prem On-Prem Instance B'
    ) {
      totals['Azure + On-Prem'] += data.totalCO2;
    }
    if (
      data.instanceName === 'MultiCloud Instance A' ||
      data.instanceName === 'MultiCloud Instance B'
    ) {
      totals['Multi Cloud'] += data.totalCO2;
    }
  });

  return totals;
};

const calculateProjectedCosts = (costData1: CostData[], years: number) =>
  costData1.map((data) => ({
    name: data.name,
    projectedTotal: data.total * 1.1 ** (years - 1), // 10% growth rate for total cost
  }));

export function OutputView() {
  const totalEmissions = calculateTotalEmissions(csr1MetricsData);

  const [selectedProvider, setSelectedProvider] = useState<string>('Azure'); // State to handle selected provider
  const bestCloudProvider = 'Azure';
  const [expanded, setExpanded] = useState<string | false>(false);
  const [tabValue, setTabValue] = useState(0);
  const [years, setYears] = useState(1); // State for the slider
  const projectedCosts = calculateProjectedCosts(costData, years);
  const bestProviderData = costData.find((data) => data.name === bestCloudProvider);
  const bestProviderCO2 = csr2MetricsData.find((data: any) =>
    data.instanceName.includes(bestCloudProvider)
  )?.totalCO2;
  // Data for the bar chart
  const lineChartData = {
    series: [
      {
        name: 'Carbon Emissions by Provider (kg/month)',
        data: [
          totalEmissions.AWS, // Total AWS emissions
          totalEmissions['On-Prem'], // Total On-Prem emissions
          totalEmissions.Azure, // Total Azure emissions
          totalEmissions['AWS + On-Prem'], // Total AWS + On-Prem emissions
          totalEmissions['AWS + Azure'], // Total AWS + Azure emissions
          totalEmissions['Azure + On-Prem'], // Total Azure + On-Prem emissions
          totalEmissions['Multi Cloud'], // Total Multi Cloud emissions
        ],
      },
    ],
  };
  const barChartData = {
    series: [
      {
        name: 'Total Cost',
        data: projectedCosts.map((data) => data.projectedTotal),
      },
    ],
  };
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setYears(newValue as number);
  };
  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      if (!isExpanded) {
        setTabValue(0); // Reset to AWS tab when collapsed
      }
    };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleProviderSelect = (provider: string) => {
    setSelectedProvider(provider);
  };

  const combinedData = [
    {
      name: 'AWS',
      cost: costData.find((data) => data.name === 'AWS')?.total || 0,
      csrMetrics: csr2MetricsData.find((data) => data.instanceName === 'AWS')?.totalCO2 || 0,
    },
  {
    name: 'Azure',
    cost: costData.find((data) => data.name === 'Azure')?.total || 0,
    csrMetrics: csr2MetricsData.find((data) => data.instanceName === 'Azure')?.totalCO2 || 0,
  },
  {
    name: 'On-Prem',
    cost: costData.find((data) => data.name === 'On-Prem')?.total || 0,
    csrMetrics: csr2MetricsData.find((data) => data.instanceName === 'On-Prem')?.totalCO2 || 0,
  },
  {
    name: 'AWS + On-Prem',
    cost: costData.find((data) => data.name === 'AWS + On-Prem')?.total || 0,
    csrMetrics: csr2MetricsData.find((data) => data.instanceName === 'AWS + On-Prem')?.totalCO2 || 0,
  },
  {
    name: 'AWS + Azure',
    cost: costData.find((data) => data.name === 'AWS + Azure')?.total || 0,
    csrMetrics: csr2MetricsData.find((data) => data.instanceName === 'AWS + Azure')?.totalCO2 || 0,
  },
  {
    name: 'Azure + On-Prem',
    cost: costData.find((data) => data.name === 'Azure + On-Prem')?.total || 0,
    csrMetrics: csr2MetricsData.find((data) => data.instanceName === 'Azure + On-Prem')?.totalCO2 || 0,
  },
  {
    name: 'Multi Cloud',
    cost: costData.find((data) => data.name === 'Multi Cloud')?.total || 0,
    csrMetrics: csr2MetricsData.find((data) => data.instanceName === 'Multi Cloud')?.totalCO2 || 0,
  },
];
const selectedProviderData = combinedData.find((data) => data.name === selectedProvider) || {
    cost: 0,
    csrMetrics: 0,
  };
  return (
    <>
      <DashboardContent maxWidth="xl">
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Hi, Welcome back 👋
        </Typography>

        <Grid container spacing={6}>
          <Grid xs={6}>
  <AnalyticsCloudProvider
    title="Current Cloud Provider Suggestion"
    bestProvider={selectedProvider === bestCloudProvider}
    csrMetrics={selectedProviderData.csrMetrics}
    cloudProvider={selectedProvider}
    cost={selectedProviderData.cost}
    color="error"
    icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
    chart={{
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      series: [56, 30, 23, 54, 47, 40, 62, 73],
    }}
  />
          </Grid>
          <Grid xs={6}>
            <AnalyticsCloudMigration
              title="Current Cloud Provider Suggestion"
              subTitle="☁️ Cloud Migration help"
              cloudProvider="Terraform Script Generator"
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/ic-glass-terraform.svg" />}
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                series: [56, 30, 23, 54, 47, 40, 62, 73],
              }}
            />
          </Grid>
        </Grid>
        <br />
        <br />
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Cloud Provider Recommendations
        </Typography>

        <Grid container spacing={3}>
          {/* Left Side: Cloud Provider Options */}
          <Grid xs={4} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Select Cloud Provider
            </Typography>
            <Grid container spacing={2}>
              {[
                'AWS',
                'Azure',
                'On-Prem',
                'AWS + Azure',
                'Azure + On-Prem',
                'Multi Cloud',
                'AWS + On-Prem',
              ].map((provider) => (
                <Grid md={1} key={provider}>
                  <CardActionArea onClick={() => handleProviderSelect(provider)}>
                    <Card
                      sx={{
                        display: 'flex',
                        width: 200,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 130,
                        background: '#e7e7e796',
                        color: 'black',
                        borderRadius: '16px',
                        boxShadow: 3,
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                          {provider}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                          {provider.includes('AWS') && (
                            <img width="60" src="/assets/aws.png" alt="AWS" />
                          )}
                          {provider.includes('Azure') && (
                            <img width="50" src="/assets/azure.png" alt="AWS" />
                          )}
                          {provider.includes('On-Prem') && <StorageIcon sx={{ fontSize: 40 }} />}
                        </Box>
                      </Box>
                    </Card>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Side: Details */}
          <Grid xs={12} md={8}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {selectedProvider} Details
            </Typography>
            <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Cost Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CostDetailsTable provider={selectedProvider} />
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Instance Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {selectedProvider === 'AWS' && (
                  <InstanceDetailsTable instanceDetails={awsInstanceDetails} />
                )}
                {selectedProvider === 'Azure' && (
                  <InstanceDetailsTable instanceDetails={azureInstanceDetails} />
                )}
                {selectedProvider === 'On-Prem' && (
                  <InstanceDetailsTable instanceDetails={onPremInstanceDetails} />
                )}
                {selectedProvider === 'Multi Cloud' && (
                  <InstanceDetailsTable instanceDetails={multiCloudInstanceDetails} />
                )}
                {selectedProvider === 'AWS + On-Prem' && (
                  <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="aws-on-prem-tabs"
                      >
                        <Tab label="AWS" />
                        <Tab label="On-Prem" />
                      </Tabs>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      {tabValue === 0 && (
                        <InstanceDetailsTable instanceDetails={awsOnPremInstanceDetailsAWS} />
                      )}
                      {tabValue === 1 && (
                        <InstanceDetailsTable instanceDetails={awsOnPremInstanceDetailsOnPrem} />
                      )}
                    </Box>
                  </>
                )}
                {selectedProvider === 'Azure + On-Prem' && (
                  <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="aws-on-prem-tabs"
                      >
                        <Tab label="Azure" />
                        <Tab label="On-Prem" />
                      </Tabs>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      {tabValue === 0 && (
                        <InstanceDetailsTable instanceDetails={azureOnPremInstanceDetailsAzure} />
                      )}
                      {tabValue === 1 && (
                        <InstanceDetailsTable instanceDetails={azureOnPremInstanceDetailsOnPrem} />
                      )}
                    </Box>
                  </>
                )}
                {selectedProvider === 'AWS + Azure' && (
                  <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="aws-on-prem-tabs"
                      >
                        <Tab label="AWS" />
                        <Tab label="Azure" />
                      </Tabs>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      {tabValue === 0 && (
                        <InstanceDetailsTable instanceDetails={awsAzureInstanceDetailsAWS} />
                      )}
                      {tabValue === 1 && (
                        <InstanceDetailsTable instanceDetails={awsAzureInstanceDetailsAzure} />
                      )}
                    </Box>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">CSR Metrics</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {selectedProvider === 'AWS' && (
                  <CSRMetricsTable instanceDetails={awsInstanceDetails} />
                )}
                {selectedProvider === 'On-Prem' && (
                  <CSRMetricsTable instanceDetails={onPremInstanceDetails} />
                )}
                {selectedProvider === 'Azure' && (
                  <CSRMetricsTable instanceDetails={azureInstanceDetails} />
                )}
                {selectedProvider === 'Multi Cloud' && (
                  <CSRMetricsTable instanceDetails={multiCloudInstanceDetails} />
                )}
                {selectedProvider === 'AWS + On-Prem' && (
                  <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="aws-on-prem-tabs"
                      >
                        <Tab label="AWS" />
                        <Tab label="On-Prem" />
                      </Tabs>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      {tabValue === 0 && (
                        <CSRMetricsTable instanceDetails={awsOnPremInstanceDetailsAWS} />
                      )}
                      {tabValue === 1 && (
                        <CSRMetricsTable instanceDetails={awsOnPremInstanceDetailsOnPrem} />
                      )}
                    </Box>
                  </>
                )}

                {selectedProvider === 'AWS + Azure' && (
                  <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={tabValue} onChange={handleTabChange} aria-label="aws-azure-tabs">
                        <Tab label="AWS" />
                        <Tab label="Azure" />
                      </Tabs>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      {tabValue === 0 && (
                        <CSRMetricsTable instanceDetails={awsAzureInstanceDetailsAWS} />
                      )}
                      {tabValue === 1 && (
                        <CSRMetricsTable instanceDetails={awsAzureInstanceDetailsAzure} />
                      )}
                    </Box>
                  </>
                )}

                {selectedProvider === 'Azure + On-Prem' && (
                  <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="azure-on-prem-tabs"
                      >
                        <Tab label="Azure" />
                        <Tab label="On-Prem" />
                      </Tabs>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      {tabValue === 0 && (
                        <CSRMetricsTable instanceDetails={azureOnPremInstanceDetailsAzure} />
                      )}
                      {tabValue === 1 && (
                        <CSRMetricsTable instanceDetails={azureOnPremInstanceDetailsOnPrem} />
                      )}
                    </Box>
                  </>
                )}

                {/* Add similar conditions for other providers if needed */}
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        <br />
        <div style={{ padding: '20px' }}>
          <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
            Graph Projections
          </Typography>

          <Grid container spacing={3}>
            {/* Bar Graph for Cost Projections */}
            <Grid xs={12}>
              <Typography variant="h6">Projected Total Costs Over Years</Typography>
              <Slider
                value={years}
                min={1}
                max={5}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                marks
                step={1}
                sx={{ mb: 2 }}
              />
              <Chart
                type="bar"
                series={barChartData.series}
                options={{
                  xaxis: {
                    categories: projectedCosts.map((data) => data.name),
                  },
                  yaxis: {
                    title: {
                      text: 'Total Cost ($)',
                    },
                    labels: {
                      formatter: (value: number) => `$${value.toFixed(2)}`,
                    },
                  },
                  plotOptions: {
                    bar: {
                      barHeight: '50%', // Adjust bar width
                      dataLabels: {
                        position: 'top', // Position the data labels on top of bars
                      },
                    },
                  },
                  tooltip: {
                    y: {
                      formatter: (value: number) => `$${value.toFixed(2)}`,
                    },
                  },
                  dataLabels: {
                    enabled: true, // Enable data labels
                    formatter: (value: number) => `$${value.toFixed(2)}`, // Format data labels
                  },
                }}
                height={364}
              />
            </Grid>
          </Grid>
        </div>
        <div style={{ padding: '20px' }}>
          <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
            Carbon Emissions Overview
          </Typography>

          <Grid container spacing={3}>
            {/* Line Graph for Carbon Emissions */}
            <Grid xs={12}>
              <Typography variant="h6">Carbon Emissions by Provider</Typography>
              <Chart
                type="line"
                series={lineChartData.series}
                options={{
                  xaxis: {
                    categories: [
                      'AWS',
                      'On-Prem',
                      'Azure',
                      'AWS + On-Prem',
                      'AWS + Azure',
                      'Azure + On-Prem',
                      'Multi Cloud',
                    ], // Only showing total emissions for each provider
                  },
                  yaxis: {
                    title: {
                      text: 'Total CO2 (g/month)',
                    },
                    labels: {
                      formatter: (value: number) => `${value.toFixed(2)} g`,
                    },
                  },
                  tooltip: {
                    y: {
                      formatter: (value: number) => `${value.toFixed(2)} g`,
                    },
                  },
                  dataLabels: {
                    enabled: true, // Enable data labels
                    formatter: (value: number) => `${value.toFixed(2)} g`, // Format data labels
                  },
                }}
                height={364}
              />
            </Grid>
          </Grid>
        </div>
        <br />
        <br />
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Cloud Provider Comparison
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Provider</TableCell>
                <TableCell>Compute Cost</TableCell>
                <TableCell>Storage Cost</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell>Total CO2 (g/month)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {costData.map((row) => {
                const csrData = csr2MetricsData.find((csr: any) => csr.instanceName.includes(row.name));
                const isBestProvider = row.name === bestCloudProvider;
                const isCostBetter = bestProviderData && row.total < bestProviderData.total;
                
                const isCO2Better =
                  bestProviderCO2 && csrData && csrData.totalCO2 < bestProviderCO2;

                return (
                  <TableRow
                    key={row.name}
                    sx={{ backgroundColor: isBestProvider ? '#fff8e0' : 'inherit' }}
                  >
                    <TableCell>
                      {row.name}
                      {isBestProvider && (
                        <Chip
                          label="Best Cloud Recommended"
                          sx={{ ml: 1, backgroundColor: '#a39770', color: 'white' }}
                          size="small"
                        />
                      )}
                    </TableCell>
                    <TableCell>{`$${row.compute}`}</TableCell>
                    <TableCell>{`$${row.storage}`}</TableCell>
                    <TableCell
                      sx={{
                        color: isCostBetter
                          ? 'green'
                          : bestProviderData && row.total > bestProviderData.total
                            ? 'red'
                            : 'inherit',
                      }}
                    >
                      {`$${row.total}`}
                      {isCostBetter ? (
                        <ArrowDownwardIcon sx={{ ml: 1, color: 'green' }} />
                      ) : bestProviderData && row.total > bestProviderData.total ? (
                        <ArrowUpwardIcon sx={{ ml: 1, color: 'red' }} />
                      ) : null}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: isCO2Better
                          ? 'green'
                          : csrData && csrData.totalCO2 > (bestProviderCO2 ?? 0)
                            ? 'red'
                            : 'inherit',
                      }}
                    >
                      {csrData ? csrData.totalCO2 : 'N/A'}
                      {isCO2Better ? (
                        <ArrowDownwardIcon sx={{ ml: 1, color: 'green' }} />
                      ) : csrData && csrData.totalCO2 > (bestProviderCO2 ?? 0) ? (
                        <ArrowUpwardIcon sx={{ ml: 1, color: 'red' }} />
                      ) : null}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardContent>
    </>
  );
}
