// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';

// import { _tasks, _posts, _timeline } from 'src/_mock';
// import { DashboardContent } from 'src/layouts/dashboard';

// import { AnalyticsNews } from '../analytics-news';
// import { AnalyticsTasks } from '../analytics-tasks';
// import { AnalyticsCurrentVisits } from '../analytics-current-visits';
// import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
// import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
// import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
// import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
// import { AnalyticsCurrentSubject } from '../analytics-current-subject';
// import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// // ----------------------------------------------------------------------

// export function OverviewAnalyticsView() {
//   return (
//     <DashboardContent maxWidth="xl">
//       <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
//         Hi, Welcome back 👋
//       </Typography>

//       <Grid container spacing={3}>
//         <Grid xs={12} sm={6} md={3}>
//           <AnalyticsWidgetSummary
//             title="Weekly sales"
//             percent={2.6}
//             total={714000}
//             icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
//             chart={{
//               categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
//               series: [22, 8, 35, 50, 82, 84, 77, 12],
//             }}
//           />
//         </Grid>

//         <Grid xs={12} sm={6} md={3}>
//           <AnalyticsWidgetSummary
//             title="New users"
//             percent={-0.1}
//             total={1352831}
//             color="secondary"
//             icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
//             chart={{
//               categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
//               series: [56, 47, 40, 62, 73, 30, 23, 54],
//             }}
//           />
//         </Grid>

//         <Grid xs={12} sm={6} md={3}>
//           <AnalyticsWidgetSummary
//             title="Purchase orders"
//             percent={2.8}
//             total={1723315}
//             color="warning"
//             icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
//             chart={{
//               categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
//               series: [40, 70, 50, 28, 70, 75, 7, 64],
//             }}
//           />
//         </Grid>

//         <Grid xs={12} sm={6} md={3}>
//           <AnalyticsWidgetSummary
//             title="Messages"
//             percent={3.6}
//             total={234}
//             color="error"
//             icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
//             chart={{
//               categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
//               series: [56, 30, 23, 54, 47, 40, 62, 73],
//             }}
//           />
//         </Grid>

//         <Grid xs={12} md={6} lg={4}>
//           <AnalyticsCurrentVisits
//             title="Current visits"
//             chart={{
//               series: [
//                 { label: 'America', value: 3500 },
//                 { label: 'Asia', value: 2500 },
//                 { label: 'Europe', value: 1500 },
//                 { label: 'Africa', value: 500 },
//               ],
//             }}
//           />
//         </Grid>

//         <Grid xs={12} md={6} lg={8}>
//           <AnalyticsWebsiteVisits
//             title="Website visits"
//             subheader="(+43%) than last year"
//             chart={{
//               categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
//               series: [
//                 { name: 'Team A', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
//                 { name: 'Team B', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
//               ],
//             }}
//           />
//         </Grid>

//         <Grid xs={12} md={6} lg={8}>
//           <AnalyticsConversionRates
//             title="Conversion rates"
//             subheader="(+43%) than last year"
//             chart={{
//               categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
//               series: [
//                 { name: '2022', data: [44, 55, 41, 64, 22] },
//                 { name: '2023', data: [53, 32, 33, 52, 13] },
//               ],
//             }}
//           />
//         </Grid>

//         <Grid xs={12} md={6} lg={4}>
//           <AnalyticsCurrentSubject
//             title="Current subject"
//             chart={{
//               categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
//               series: [
//                 { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
//                 { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
//                 { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
//               ],
//             }}
//           />
//         </Grid>

//         <Grid xs={12} md={6} lg={8}>
//           <AnalyticsNews title="News" list={_posts.slice(0, 5)} />
//         </Grid>

//         <Grid xs={12} md={6} lg={4}>
//           <AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
//         </Grid>

//         <Grid xs={12} md={6} lg={4}>
//           <AnalyticsTrafficBySite
//             title="Traffic by site"
//             list={[
//               { value: 'facebook', label: 'Facebook', total: 323234 },
//               { value: 'google', label: 'Google', total: 341212 },
//               { value: 'linkedin', label: 'Linkedin', total: 411213 },
//               { value: 'twitter', label: 'Twitter', total: 443232 },
//             ]}
//           />
//         </Grid>

//         <Grid xs={12} md={6} lg={8}>
//           <AnalyticsTasks title="Tasks" list={_tasks} />
//         </Grid>
//       </Grid>
//     </DashboardContent>
//   );
// }
// import React, { useState } from 'react';
// import {
//   Typography,
//   Grid,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// // Define a type for the cost data
// type CostData = {
//   name: string;
//   compute: number;
//   storage: number;
//   network: number;
//   total: number;
// };

// // Define the props for the CostDetailsTable
// interface CostDetailsTableProps {
//   provider: string;
// }

// // Dummy data with typed structure
// const costData: CostData[] = [
//   { name: 'AWS', compute: 9658, storage: 156.85, network: 2898.3, total: 12713.15 },
//   { name: 'On-Prem', compute: 8488, storage: 105.56, network: 1876, total: 8469.56 },
//   { name: 'AWS + On-Prem', compute: 11000, storage: 300, network: 4000, total: 15300 },
// ];

// // Table component that filters and displays cost data for a given provider
// const CostDetailsTable: React.FC<CostDetailsTableProps> = ({ provider }) => (
//   <TableContainer component={Paper}>
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>Provider</TableCell>
//           <TableCell>Compute Cost</TableCell>
//           <TableCell>Storage Cost</TableCell>
//           <TableCell>Network Cost</TableCell>
//           <TableCell>Total Cost</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {costData.filter((data) => data.name === provider).map((row) => (
//           <TableRow key={row.name}>
//             <TableCell>{row.name}</TableCell>
//             <TableCell>{`$${row.compute}`}</TableCell>
//             <TableCell>{`$${row.storage}`}</TableCell>
//             <TableCell>{`$${row.network}`}</TableCell>
//             <TableCell>{`$${row.total}`}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </TableContainer>
// );

// // Main component for the output page
// export function OverviewAnalyticsView() {
//   const [expanded, setExpanded] = useState<string | false>(false);

//   const handleAccordionChange = (panel: string) => (
//     event: React.SyntheticEvent,
//     isExpanded: boolean
//   ) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
//         Cloud Provider Recommendations
//       </Typography>

//       <Grid container spacing={3}>
//         {/* AWS Section */}
//         <Grid item xs={12}>
//           <Accordion
//             expanded={expanded === 'panel1'}
//             onChange={handleAccordionChange('panel1')}
//           >
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography variant="h6">AWS</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography variant="subtitle1">Cost Details</Typography>
//               <CostDetailsTable provider="AWS" />
//             </AccordionDetails>
//           </Accordion>
//         </Grid>

//         {/* On-Prem Section */}
//         <Grid item xs={12}>
//           <Accordion
//             expanded={expanded === 'panel2'}
//             onChange={handleAccordionChange('panel2')}
//           >
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography variant="h6">On-Prem</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography variant="subtitle1">Cost Details</Typography>
//               <CostDetailsTable provider="On-Prem" />
//             </AccordionDetails>
//           </Accordion>
//         </Grid>

//         {/* AWS + On-Prem Section */}
//         <Grid item xs={12}>
//           <Accordion
//             expanded={expanded === 'panel3'}
//             onChange={handleAccordionChange('panel3')}
//           >
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography variant="h6">AWS + On-Prem</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography variant="subtitle1">Cost Details</Typography>
//               <CostDetailsTable provider="AWS + On-Prem" />
//             </AccordionDetails>
//           </Accordion>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
// import React, { useState } from 'react';
// import {
//   Typography,
//   Grid,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// // Define a type for the cost data
// type CostData = {
//   name: string;
//   compute: number;
//   storage: number;
//   network: number;
//   total: number;
// };

// // Define a type for instance details
// type InstanceDetails = {
//   instanceName: string;
//   computeRegion: string;
//   storageRegion: string;
// };

// // Define the props for the CostDetailsTable
// interface CostDetailsTableProps {
//   provider: string;
// }

// // Dummy cost data
// const costData: CostData[] = [
//   { name: 'AWS', compute: 9658, storage: 156.85, network: 2898.3, total: 12713.15 },
//   { name: 'On-Prem', compute: 8488, storage: 105.56, network: 1876, total: 8469.56 },
//   { name: 'AWS + On-Prem', compute: 11000, storage: 300, network: 4000, total: 15300 },
// ];

// // Dummy instance details
// const instanceDetails: InstanceDetails[] = [
//   { instanceName: 'Instance 1', computeRegion: 'us-east-1', storageRegion: 'us-west-2' },
//   { instanceName: 'Instance 2', computeRegion: 'eu-central-1', storageRegion: 'eu-west-1' },
//   { instanceName: 'Instance 3', computeRegion: 'ap-south-1', storageRegion: 'ap-southeast-1' },
// ];

// // Table component that filters and displays cost data for a given provider
// const CostDetailsTable: React.FC<CostDetailsTableProps> = ({ provider }) => (
//   <TableContainer component={Paper}>
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>Provider</TableCell>
//           <TableCell>Compute Cost</TableCell>
//           <TableCell>Storage Cost</TableCell>
//           <TableCell>Network Cost</TableCell>
//           <TableCell>Total Cost</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {costData.filter((data) => data.name === provider).map((row) => (
//           <TableRow key={row.name}>
//             <TableCell>{row.name}</TableCell>
//             <TableCell>{`$${row.compute}`}</TableCell>
//             <TableCell>{`$${row.storage}`}</TableCell>
//             <TableCell>{`$${row.network}`}</TableCell>
//             <TableCell>{`$${row.total}`}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </TableContainer>
// );

// // Table component that shows instance details
// const InstanceDetailsTable: React.FC = () => (
//   <TableContainer component={Paper} sx={{ mt: 3 }}>
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>Instance Name</TableCell>
//           <TableCell>Compute Region</TableCell>
//           <TableCell>Storage Region</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {instanceDetails.map((instance) => (
//           <TableRow key={instance.instanceName}>
//             <TableCell>{instance.instanceName}</TableCell>
//             <TableCell>{instance.computeRegion}</TableCell>
//             <TableCell>{instance.storageRegion}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </TableContainer>
// );

// // Main component for the output page
// export function OverviewAnalyticsView() {
//   const [expanded, setExpanded] = useState<string | false>(false);

//   const handleAccordionChange = (panel: string) => (
//     event: React.SyntheticEvent,
//     isExpanded: boolean
//   ) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
//         Cloud Provider Recommendations
//       </Typography>

//       <Grid container spacing={3}>
//         {/* AWS Section */}
//         <Grid item xs={12}>
//           <Accordion
//             expanded={expanded === 'panel1'}
//             onChange={handleAccordionChange('panel1')}
//           >
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography variant="h6">AWS</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography variant="subtitle1">Cost Details</Typography>
//               <CostDetailsTable provider="AWS" />
//               <Typography variant="subtitle1" sx={{ mt: 2 }}>
//                 Instance Details
//               </Typography>
//               <InstanceDetailsTable />
//             </AccordionDetails>
//           </Accordion>
//         </Grid>

//         {/* On-Prem Section */}
//         <Grid item xs={12}>
//           <Accordion
//             expanded={expanded === 'panel2'}
//             onChange={handleAccordionChange('panel2')}
//           >
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography variant="h6">On-Prem</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography variant="subtitle1">Cost Details</Typography>
//               <CostDetailsTable provider="On-Prem" />
//               <Typography variant="subtitle1" sx={{ mt: 2 }}>
//                 Instance Details
//               </Typography>
//               <InstanceDetailsTable />
//             </AccordionDetails>
//           </Accordion>
//         </Grid>

//         {/* AWS + On-Prem Section */}
//         <Grid item xs={12}>
//           <Accordion
//             expanded={expanded === 'panel3'}
//             onChange={handleAccordionChange('panel3')}
//           >
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography variant="h6">AWS + On-Prem</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography variant="subtitle1">Cost Details</Typography>
//               <CostDetailsTable provider="AWS + On-Prem" />
//               <Typography variant="subtitle1" sx={{ mt: 2 }}>
//                 Instance Details
//               </Typography>
//               <InstanceDetailsTable />
//             </AccordionDetails>
//           </Accordion>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
// import React, { useState } from 'react';
// import {
//   Typography,
//   Grid,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// // Define a type for the cost data
// type CostData = {
//   name: string;
//   compute: number;
//   storage: number;
//   network: number;
//   total: number;
// };

// // Define a type for instance details
// type InstanceDetails = {
//   instanceName: string;
//   computeRegion: string;
//   storageRegion: string;
//   storageGB: number;
//   vCPUs: number;
//   workloadNumber: number;
// };

// // Define the props for the CostDetailsTable
// interface CostDetailsTableProps {
//   provider: string;
// }

// // Dummy cost data
// const costData: CostData[] = [
//   { name: 'AWS', compute: 9658, storage: 156.85, network: 2898.3, total: 12713.15 },
//   { name: 'On-Prem', compute: 8488, storage: 105.56, network: 1876, total: 8469.56 },
//   { name: 'AWS + On-Prem', compute: 11000, storage: 300, network: 4000, total: 15300 },
// ];

// // Dummy instance details with new fields
// const instanceDetails: InstanceDetails[] = [
//   { instanceName: 'Instance 1', computeRegion: 'us-east-1', storageRegion: 'us-west-2', storageGB: 500, vCPUs: 16, workloadNumber: 1 },
//   { instanceName: 'Instance 2', computeRegion: 'eu-central-1', storageRegion: 'eu-west-1', storageGB: 1000, vCPUs: 32, workloadNumber: 2 },
//   { instanceName: 'Instance 3', computeRegion: 'ap-south-1', storageRegion: 'ap-southeast-1', storageGB: 750, vCPUs: 24, workloadNumber: 3 },
// ];

// // Table component that filters and displays cost data for a given provider
// const CostDetailsTable: React.FC<CostDetailsTableProps> = ({ provider }) => (
//   <TableContainer component={Paper}>
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>Provider</TableCell>
//           <TableCell>Compute Cost</TableCell>
//           <TableCell>Storage Cost</TableCell>
//           <TableCell>Network Cost</TableCell>
//           <TableCell>Total Cost</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {costData.filter((data) => data.name === provider).map((row) => (
//           <TableRow key={row.name}>
//             <TableCell>{row.name}</TableCell>
//             <TableCell>{`$${row.compute}`}</TableCell>
//             <TableCell>{`$${row.storage}`}</TableCell>
//             <TableCell>{`$${row.network}`}</TableCell>
//             <TableCell>{`$${row.total}`}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </TableContainer>
// );

// // Updated InstanceDetailsTable with additional fields
// const InstanceDetailsTable: React.FC = () => (
//   <TableContainer component={Paper} sx={{ mt: 3 }}>
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>Instance Name</TableCell>
//           <TableCell>Compute Region</TableCell>
//           <TableCell>Storage Region</TableCell>
//           <TableCell>Storage (GB)</TableCell>
//           <TableCell>vCPUs</TableCell>
//           <TableCell>Workload Number</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {instanceDetails.map((instance) => (
//           <TableRow key={instance.instanceName}>
//             <TableCell>{instance.instanceName}</TableCell>
//             <TableCell>{instance.computeRegion}</TableCell>
//             <TableCell>{instance.storageRegion}</TableCell>
//             <TableCell>{instance.storageGB}</TableCell>
//             <TableCell>{instance.vCPUs}</TableCell>
//             <TableCell>{instance.workloadNumber}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </TableContainer>
// );

// // Main component for the output page
// export function OverviewAnalyticsView() {
//   const [expanded, setExpanded] = useState<string | false>(false);

//   const handleAccordionChange = (panel: string) => (
//     event: React.SyntheticEvent,
//     isExpanded: boolean
//   ) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
//         Cloud Provider Recommendations
//       </Typography>

//       <Grid container spacing={3}>
//         {/* AWS Section */}
//         <Grid item xs={12}>
//           <Accordion
//             expanded={expanded === 'panel1'}
//             onChange={handleAccordionChange('panel1')}
//           >
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography variant="h6">AWS</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography variant="subtitle1">Cost Details</Typography>
//               <CostDetailsTable provider="AWS" />
//               <Typography variant="subtitle1" sx={{ mt: 2 }}>
//                 Instance Details
//               </Typography>
//               <InstanceDetailsTable />
//             </AccordionDetails>
//           </Accordion>
//         </Grid>

//         {/* On-Prem Section */}
//         <Grid item xs={12}>
//           <Accordion
//             expanded={expanded === 'panel2'}
//             onChange={handleAccordionChange('panel2')}
//           >
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography variant="h6">On-Prem</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography variant="subtitle1">Cost Details</Typography>
//               <CostDetailsTable provider="On-Prem" />
//               <Typography variant="subtitle1" sx={{ mt: 2 }}>
//                 Instance Details
//               </Typography>
//               <InstanceDetailsTable />
//             </AccordionDetails>
//           </Accordion>
//         </Grid>

//         {/* AWS + On-Prem Section */}
//         <Grid item xs={12}>
//           <Accordion
//             expanded={expanded === 'panel3'}
//             onChange={handleAccordionChange('panel3')}
//           >
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography variant="h6">AWS + On-Prem</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography variant="subtitle1">Cost Details</Typography>
//               <CostDetailsTable provider="AWS + On-Prem" />
//               <Typography variant="subtitle1" sx={{ mt: 2 }}>
//                 Instance Details
//               </Typography>
//               <InstanceDetailsTable />
//             </AccordionDetails>
//           </Accordion>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }