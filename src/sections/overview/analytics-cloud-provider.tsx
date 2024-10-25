import type { CardProps } from '@mui/material/Card';
import type { ColorType } from 'src/theme/core/palette';
import type { ChartOptions } from 'src/components/chart';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { fNumber, fShortenNumber } from 'src/utils/format-number';
import { varAlpha, bgGradient } from 'src/theme/styles';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  csrMetrics: number;
  cost: number;
  cloudProvider: string;
  bestProvider: boolean;
  color?: ColorType;
  icon: React.ReactNode;
  chart: {
    series: number[];
    categories: string[];
    options?: ChartOptions;
  };
};

export function AnalyticsCloudProvider({
  icon,
  title,
  csrMetrics,
  cost,
  chart,
  cloudProvider,
  bestProvider,
  color = 'primary',
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const chartColors = [theme.palette[color].dark];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    xaxis: { categories: chart.categories },
    grid: {
      padding: {
        top: 6,
        left: 6,
        right: 6,
        bottom: 6,
      },
    },
    tooltip: {
      y: { formatter: (value: number) => fNumber(value), title: { formatter: () => '' } },
    },
    ...chart.options,
  });

  const badgeContent = bestProvider ? 'Best Suggestion 🏆' : 'User Selected 🙍‍♂️';

  return (
    <Card
      sx={{
        ...bgGradient({
          color: `135deg, ${varAlpha(theme.vars.palette[color].lighterChannel, 0.48)}, ${varAlpha(theme.vars.palette[color].lightChannel, 0.48)}`,
        }),
        p: 3,
        boxShadow: 'none',
        position: 'relative',
        color: `${color}.darker`,
        backgroundColor: 'common.white',
        borderRadius: '16px',
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ width: 48, height: 48, mb: 3 }}>{icon}</Box>

      <Chip
        label={badgeContent}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          padding: '8px 16px',
          borderRadius: '12px',
          backgroundColor: bestProvider ? '#b63a24' : '#000', // Custom colors
          color: 'white',
          fontWeight: 'bold',
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ flexGrow: 1, minWidth: 122 }}>
          <Box sx={{ mb: 1, typography: 'h5' }}>{cloudProvider}</Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ typography: 'subtitle2', mr: 2 }}>CSR:</Box>
            <Box sx={{ typography: 'h6', mr: 4 }}>{fShortenNumber(csrMetrics)} kg/month</Box>
            <Box sx={{ typography: 'subtitle2', mr: 2 }}>Cost:</Box>
            <Box sx={{ typography: 'h6', mr: 4}}>$ {fShortenNumber(cost)}</Box>
            <Box sx={{ typography: 'subtitle2', mr: 2 }}>Region:</Box>
            <Box sx={{ typography: 'h6' }}>Europe</Box>
          </Box>
        </Box>

        <Chart
          type="line"
          series={[{ data: chart.series }]}
          options={chartOptions}
          width={84}
          height={56}
        />
      </Box>

      <SvgColor
        src="/assets/background/shape-square.svg"
        sx={{
          top: 0,
          left: -20,
          width: 240,
          zIndex: -1,
          height: 240,
          opacity: 0.24,
          position: 'absolute',
          color: `${color}.main`,
        }}
      />
    </Card>
  );
}