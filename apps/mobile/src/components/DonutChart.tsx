import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

const DonutChart = () => {
  // Chart data
  const data = [
    { label: 'Utilizades', value: 447.84, percentage: 36, color: '#FFA500' },
    { label: 'Pagamentos', value: 248.8, percentage: 20, color: '#4A90E2' },
    { label: 'Gastos', value: 149.28, percentage: 12, color: '#4CD964' },
    { label: 'Investimentos', value: 99.52, percentage: 8, color: '#FF6B6B' },
    { label: 'Other', value: 299.21, percentage: 24, color: '#9B59B6' },
  ];

  const totalSpent = 1244.65;
  const size = 280;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Calculate arc paths
  let currentAngle = -90; // Start from top

  const arcs = data.map((item) => {
    const angle = (item.percentage / 100) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;

    // Calculate stroke dash array for the segment
    const segmentLength = (item.percentage / 100) * circumference;
    const dashArray = `${segmentLength} ${circumference}`;
    const dashOffset = -((startAngle + 90) / 360) * circumference;

    return {
      ...item,
      dashArray,
      dashOffset,
      rotation: startAngle + angle / 2,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Svg width={size} height={size}>
          <G rotation={0} origin={`${center}, ${center}`}>
            {arcs.map((arc, index) => (
              <Circle
                key={index}
                cx={center}
                cy={center}
                r={radius}
                stroke={arc.color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={0}
                fill="none"
                strokeLinecap="round"
                transform={`rotate(${arc.rotation - (arc.percentage / 100) * 180} ${center} ${center})`}
                opacity={1}
              />
            ))}
          </G>
        </Svg>

        {/* Center text */}
        <View style={styles.centerContent}>
          <Text style={styles.centerLabel}>Spent this April ▼</Text>
          <Text style={styles.centerAmount}>${totalSpent.toLocaleString()}</Text>
        </View>

        {/* Percentage labels around the circle */}
        <View style={styles.labelContainer}>
          {data.map((item, index) => {
            // Calculate position for each label
            const angle = -90 + (data.slice(0, index).reduce((sum, d) => sum + d.percentage, 0) + item.percentage / 2) * 3.6;
            const radian = (angle * Math.PI) / 180;
            const labelRadius = radius + strokeWidth / 2 + 25;
            const x = center + labelRadius * Math.cos(radian);
            const y = center + labelRadius * Math.sin(radian);

            return (
              <View
                key={index}
                style={[
                  styles.percentageLabel,
                  {
                    left: x - 20,
                    top: y - 12,
                  },
                ]}
              >
                <Text style={styles.percentageText}>{item.percentage}%</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Time period selector */}
      <View style={styles.periodSelector}>
        <Text style={[styles.periodText, styles.periodInactive]}>Week</Text>
        <Text style={[styles.periodText, styles.periodActive]}>Month</Text>
        <Text style={[styles.periodText, styles.periodInactive]}>Year</Text>
      </View>

      {/* Spending categories */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>Spending Categories</Text>
        
        <View style={styles.categoryRow}>
          <View style={styles.categoryItem}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFE5B4' }]}>
              <Text style={styles.iconText}>💡</Text>
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryAmount}>${data[0].value}</Text>
              <Text style={styles.categoryLabel}>{data[0].label}</Text>
            </View>
            <Text style={styles.categoryPercentage}>{data[0].percentage}%</Text>
          </View>

          <View style={styles.categoryItem}>
            <View style={[styles.iconCircle, { backgroundColor: '#E8F5E9' }]}>
              <Text style={styles.iconText}>📄</Text>
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryAmount}>${data[2].value}</Text>
              <Text style={styles.categoryLabel}>{data[2].label}</Text>
            </View>
            <Text style={styles.categoryPercentage}>{data[2].percentage}%</Text>
          </View>
        </View>

        <View style={styles.categoryRow}>
          <View style={styles.categoryItem}>
            <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
              <Text style={styles.iconText}>💳</Text>
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryAmount}>${data[1].value}</Text>
              <Text style={styles.categoryLabel}>{data[1].label}</Text>
            </View>
            <Text style={styles.categoryPercentage}>{data[1].percentage}%</Text>
          </View>

          <View style={styles.categoryItem}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFEBEE' }]}>
              <Text style={styles.iconText}>N</Text>
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryAmount}>${data[3].value}</Text>
              <Text style={styles.categoryLabel}>{data[3].label}</Text>
            </View>
            <Text style={styles.categoryPercentage}>{data[3].percentage}%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    paddingTop: 60,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
    height: 280,
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  centerAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  labelContainer: {
    position: 'absolute',
    width: 280,
    height: 280,
  },
  percentageLabel: {
    position: 'absolute',
    width: 40,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginBottom: 30,
  },
  periodText: {
    fontSize: 16,
    fontWeight: '500',
  },
  periodActive: {
    color: '#000',
    fontWeight: '600',
  },
  periodInactive: {
    color: '#999',
  },
  categoriesContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#000',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  categoryLabel: {
    fontSize: 13,
    color: '#999',
  },
  categoryPercentage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
  },
});

export default DonutChart;