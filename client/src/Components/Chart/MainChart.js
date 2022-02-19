import React, {useState, useEffect} from 'react'
import { Chart } from "react-google-charts";



function MainChart({projectList}) {
    const [trackHeight, setTrackHeight] = useState(30);
    const options = {
        height: trackHeight * (projectList.length+1),
        gantt: {
            trackHeight: trackHeight
        },
    };
    const columns = [
        { type: "string", label: "Task ID" }, //
        { type: "string", label: "Task Name" }, //
        //{ type: "string", label: "Resource" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" }, //
        { type: "number", label: "Duration" }, //
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" }, //
      ];

    
    const [processedList, setProcessedList] = useState([]);
    //2d Array
    const processProjectList = () => {
        let returnList = []
        projectList.forEach((project) => {
            let splitStartDate = project.project_create_date.split("-")
            let startDate = new Date(splitStartDate[0], splitStartDate[1] -1, splitStartDate[2])
            let splitEndDate = project.project_deadline.split("-")
            let endDate = new Date(splitEndDate[0], splitEndDate[1]-1, splitEndDate[2]);

            let processedProject = [
                project.project_id,
                project.project_name,
                //'spring',
                startDate,
                endDate,
                null, //duration
                0, //percent complete
                null
            ]
            returnList.push(processedProject)
        })
        setProcessedList([...returnList])
    }
    useEffect(() => {
        processProjectList()
    }, [projectList]);
    useEffect(() => {

    })
    
    const showChart = () => {
        console.log(projectList)
        return(
            <div id="gannt-chart">
                <Chart
                    chartType="Gantt"
                    width="100%"
                    height="100%"
                    data={[columns, ...processedList]}
                    options={options}
                    legendToggle
                />
            </div>
        )
    }
    const showMessage = () => {
        return(
            <h1>Add a Project to get Started!</h1>
        )
    }
    return (
        <div className='chart-display'>
            {processedList.length ? showChart() : showMessage()}
        </div>

    )
}

export default MainChart