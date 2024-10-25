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
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  cloudProvider: string;
  color?: ColorType;
  subTitle?: string;
  icon: React.ReactNode;
};

export function AnalyticsCloudMigration({
  icon,
  title,
  cloudProvider,
  subTitle,
  color = 'primary',
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const chartColors = [theme.palette[color].dark];

 
  const handleDownload = ( cloudProvider1: any ) => {
     const filePath = `/assets/files/${cloudProvider1}.tf`;
      const link = document.createElement('a');
      link.href = filePath;
      link.download = `${cloudProvider1}.tf`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
  };

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
        label={subTitle}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          padding: '8px 16px',
          borderRadius: '12px',
          backgroundColor:  `${color}.darker`,
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
      <Box sx={{ mb: 1, typography: 'h5' }}>Terraform Script Generator</Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Button
          variant="contained"
          onClick={() => handleDownload(cloudProvider)}
          sx={{
            backgroundColor: '#FFA500', // Gold color
            color: 'white',
            '&:hover': {
              backgroundColor:  `${color}.darker`, // Orange color
            },
          }}
        >
          Generate
        </Button>
      </Box>
    </Box>

       
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