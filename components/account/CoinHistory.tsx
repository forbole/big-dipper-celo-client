import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  AreaSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { born} from '../../../demo-data/data-vizualization';

export default function CoinHistory() {
    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <AreaSeries
            valueField="ru"
            argumentField="year"
          />
          <AreaSeries
            valueField="ch"
            argumentField="year"
          />
          <AreaSeries
            valueField="us"
            argumentField="year"
          />
        </Chart>
      </Paper>
    );
  }
}