import React from "react";
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = [
	"星期一",
	"星期二",
	"星期三",
	"星期四",
	"星期五",
	"星期六",
	"星期天",
];

const Forecast = ({ data }) => {
	const dayInAWeek = new Date().getDay();
	const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
		WEEK_DAYS.slice(0, dayInAWeek)
	);

	return (
		<>
			<label className="title">未来七日天气</label>
			<Accordion allowZeroExpanded >
				{data.list.splice(0, 7).map((item, idx) => (
					<AccordionItem key={idx}>
						<AccordionItemHeading>
							<AccordionItemButton>
								<div className="daily-item">
									<img
										src={`icons/${item.weather[0].icon}.png`}
										className="icon-small"
										alt="weather"
									/>
									<label className="day">
										{forecastDays[idx]}
									</label>
									<label className="description">
										{item.weather[0].description}
									</label>
									<label className="min-max">
										{Math.round(item.main.temp_max)}°C /
										{Math.round(item.main.temp_min)}°C
									</label>
								</div>
							</AccordionItemButton>
						</AccordionItemHeading>
						<AccordionItemPanel>
							<div className="daily-details-grid">
								<div className="daily-details-grid-item">
									<label>气压:</label>
									<label>{item.main.pressure}</label>
								</div>
								<div className="daily-details-grid-item">
									<label>适度:</label>
									<label>{item.main.humidity}</label>
								</div>
								<div className="daily-details-grid-item">
									<label>云量:</label>
									<label>{item.clouds.all}%</label>
								</div>
								<div className="daily-details-grid-item">
									<label>风速:</label>
									<label>{item.wind.speed} m/s</label>
								</div>
								<div className="daily-details-grid-item">
									<label>海拔高度:</label>
									<label>{item.main.sea_level}m</label>
								</div>
								<div className="daily-details-grid-item">
									<label>体感温度:</label>
									<label>{item.main.feels_like}°C</label>
								</div>
							</div>
						</AccordionItemPanel>
					</AccordionItem>
				))}
			</Accordion>
		</>
	);
};

export default Forecast;
