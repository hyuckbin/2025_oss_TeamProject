import { Line } from 'react-chartjs-2';
import {
Chart as ChartJS,
LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend,
} from 'chart.js';
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);


// props: labels(string[]), prices(number[])
export default function PriceChart({ labels = [], prices = [] }){
const data = {
labels,
datasets: [
{
label: '최근 시세',
data: prices,
}
]
};
const options = {
responsive: true,
maintainAspectRatio: false,
plugins: { legend: { position: 'top' } },
scales: { y: { beginAtZero: true } }
};
return (
<div style={{ height: 260 }}>
<Line data={data} options={options} />
</div>
);
}