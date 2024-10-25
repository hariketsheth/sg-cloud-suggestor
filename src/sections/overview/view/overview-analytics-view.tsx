import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';
// ----------------------------------------------------------------------
export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Number of Workloads"
            percent={2.6}
            total={70}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Efficiency Score"
            percent={15}
            total={92}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Optimized Cost"
            percent={2.8}
            total={170315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Carbon Offset (kg/month)"
            percent={3.6}
            total={234}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-carbon.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Cloud Regions Spread"
            chart={{
              series: [
                { label: 'North America', value: 3500 },
                { label: 'Asia Pacific', value: 2500 },
                { label: 'Europe', value: 1500 },
                { label: 'South America', value: 500 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Application Statistics"
            subheader="(+42%) than last year"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
              series: [
                { name: 'Cost', data: [43, 33, 22, 37, 67, 68, 37, 24, 55, 67] },
                { name: 'Co2 Offset', data: [51, 70, 47, 67, 40, 37, 24, 70, 24, 45] },
              ],
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
