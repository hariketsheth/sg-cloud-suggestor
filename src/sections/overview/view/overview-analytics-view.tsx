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
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

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
  { name: 'AWS', compute: 9658, storage: 156.85, total: 9814.85 },
  { name: 'On-Prem', compute: 8488, storage: 105.56, total: 8593.56 },
  { name: 'AWS + On-Prem', compute: 11000, storage: 300, total: 11300 },
  { name: 'AWS', compute: 9658, storage: 156.85, total: 9814.85 },
  { name: 'On-Prem', compute: 8488, storage: 105.56, total: 8593.56 },
  { name: 'AWS + On-Prem', compute: 11000, storage: 300, total: 11300 },
];

// Dummy instance details for AWS, On-Prem, and AWS + On-Prem with unique data
const awsInstanceDetails: InstanceDetails[] = [
  {
    instanceName: 'AWS Instance A',
    computeRegion: 'us-west-1',
    storageRegion: 'us-east-1',
    storageGB: 600,
    vCPUs: 8,
    workloadName: 'Marley ML',
  },
  {
    instanceName: 'AWS Instance B',
    computeRegion: 'eu-west-2',
    storageRegion: 'eu-central-1',
    storageGB: 300,
    vCPUs: 16,
    workloadName: 'Marley DL',
  },
];

const onPremInstanceDetails: InstanceDetails[] = [
  {
    instanceName: 'On-Prem Instance A',
    computeRegion: 'Local-Region-1',
    storageRegion: 'Local-Region-2',
    storageGB: 750,
    vCPUs: 24,
    workloadName: 'Marley ML',
  },
  {
    instanceName: 'On-Prem Instance B',
    computeRegion: 'Local-Region-3',
    storageRegion: 'Local-Region-4',
    storageGB: 900,
    vCPUs: 32,
    workloadName: 'Marley DL',
  },
];

const awsOnPremInstanceDetailsAWS: InstanceDetails[] = [
  {
    instanceName: 'AWS+On-Prem AWS Instance A',
    computeRegion: 'us-east-2',
    storageRegion: 'us-west-1',
    storageGB: 1000,
    vCPUs: 64,
    workloadName: 'Marley ML',
  },
];

const awsOnPremInstanceDetailsOnPrem: InstanceDetails[] = [
  {
    instanceName: 'AWS+On-Prem On-Prem Instance A',
    computeRegion: 'Local-5',
    storageRegion: 'Local-6',
    storageGB: 1200,
    vCPUs: 48,
    workloadName: 'Marley DL',
  },
];

// Dummy CSR metrics data
const csrMetricsData: CSRMetrics[] = [
  { instanceName: 'AWS Instance A', totalCO2: 4.041 },
  { instanceName: 'AWS Instance B', totalCO2: 3.04 },
  { instanceName: 'On-Prem Instance A', totalCO2: 4.091 },
  { instanceName: 'On-Prem Instance B', totalCO2: 3.908 },
  { instanceName: 'AWS+On-Prem AWS Instance A', totalCO2: 5.403 },
  { instanceName: 'AWS+On-Prem On-Prem Instance A', totalCO2: 3.001 },
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
          <TableCell>Workload Name</TableCell>
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
          <TableCell>Total CO2 (g/month)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {instanceDetails.map((instance) => {
          const csrData = csrMetricsData.find((csr) => csr.instanceName === instance.instanceName);
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

export function OverviewAnalyticsView() {
  const [selectedProvider, setSelectedProvider] = useState<string>('AWS'); // State to handle selected provider
const bestCloudProvider = 'AWS'; 
  const [expanded, setExpanded] = useState<string | false>(false);
  const [tabValue, setTabValue] = useState(0);

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
              csrMetrics={234}
              cloudProvider={selectedProvider}
              cost={234}
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
                          {provider.includes('AWS') && <img width="60" src="/assets/aws.png" alt="AWS" />}
                          {provider.includes('Azure') && <img width="50" src="/assets/azure.png" alt="AWS" />}
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
                {selectedProvider === 'On-Prem' && (
                  <InstanceDetailsTable instanceDetails={onPremInstanceDetails} />
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
                {/* Add similar conditions for other providers if needed */}
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
                {/* Add similar conditions for other providers if needed */}
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </DashboardContent>
    </>
  );
}
