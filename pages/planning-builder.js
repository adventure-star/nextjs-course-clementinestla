import { PlanningBuilderInput } from '@components/planning-builder-input'
import { getLabelDay } from '@util'


export default class PlanningBuilder extends React.Component {
    state = {
        month: "",
        year: "",
        showJsonFile: false,
        file: {
            label: "label",
            color: "beach-green",

        },
        planning: []

    };

    getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    participantsIsNull(elem) {
        if (elem.participants == null) {
            return true
        }
        return false
    }

    getJsonFileName() {
        let month = this.state.month
        if (month <= 10) {
            month = `0${month}`
        }
        return `${this.state.year}_${month}.json`
    }

    componentDidMount() {
        const now = new Date()
        this.setState({ month: now.getMonth(), year: now.getFullYear() });
    }

    deleteEvent = (indexDay, indexEvent) => (e) => {
        e.preventDefault();
        let newArray = [...this.state.planning]
        let elem = newArray[indexDay].events
        elem.splice(indexEvent, 1);

        this.setState({
            planning: newArray,
        });
    }

    addEvent = (indexDay) => (e) => {
        e.preventDefault();
        let newArray = [...this.state.planning]
        newArray[indexDay].events.push({ type: "", start: "", end: "" })
        this.setState({
            planning: newArray,
        });
    }

    handleClick = (e) => {
        e.preventDefault();
        const nbrOfDays = this.getDaysInMonth(this.state.month, this.state.year)
        let planning = new Array(nbrOfDays)

        for (let i = 0; i < nbrOfDays; i++) {
            const dayPlanning = {
                //array start at 0 but day at 1
                day: i + 1,
                events: [{ type: "", start: "", end: "" }]
            }
            planning[i] = dayPlanning
        }
        this.setState({ planning: planning });

    }

    handleChangeMonth = (e) => {
        this.setState({ month: e.target.value });
    }
    handleChangeYear = (e) => {
        this.setState({ year: e.target.value });
    }

    handleChangeType = (index) => (e) => {
        let newArray = [...this.state.planning]
        newArray[index].type = e.target.value

        this.setState({
            planning: newArray,
        });
    }

    handleChangePlaning = (indexDay, indexEvent, parameter) => (e) => {
        let newArray = [...this.state.planning]
        const value = e.target.value
        let elem = newArray[indexDay].events[indexEvent]
        switch (parameter) {
            case 'type':
                elem.type = value
                break;
            case 'start':
                elem.start = value
                break;
            case 'end':
                elem.end = value
                break;
            case 'label':
                elem.label = value
                break;
            case 'participants-max':
                elem.participants.max = value
                break;
            case 'participants-booked':
                elem.participants.booked = value
                break;
            default:
                console.log(`Sorry, we are out of ${expr}.`);
        }
        this.setState({
            planning: newArray,
        });
    }


    triggerParticipants = (indexDay, indexEvent) => (e) => {
        e.preventDefault();
        let newArray = [...this.state.planning]
        let elem = newArray[indexDay].events[indexEvent]

        if (this.participantsIsNull(elem)) {
            elem.participants = { max: 4, booked: 0 }
        } else {
            delete elem.participants
        }

        this.setState({
            planning: newArray,
        });
    }

    showJsonFile = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            showJsonFile: !prevState.showJsonFile
        }))
    };

    render() {

        const availableHours = ["9h00", "10h00", "11h00", "12h00", "13h00", "14h00", "15h00", "16h00", "17h00", "18h00", "19h00", "20h00"]
        const availableType = ["access libre", "projet libre", "cours enfants", "cours ados", "cours adultes", "atelier à theme", "cours particulier"]
        const availableLabel = ["5€ l'heure"]


        return (
            <div className="">
                <section>
                    <button onClick={this.handleClick}>+</button>
                    <label> month :
          <input type="text" value={this.state.month} onChange={this.handleChangeMonth} />
                    </label>
                    <label> year :
          <input type="text" value={this.state.year} onChange={this.handleChangeYear} />
                    </label>

                    {this.state.planning.map((dayPlanning, indexDay) =>
                        <div key={indexDay} className="flex flex-row ">
                            <div className="flex flex-col mb-8">
                                <h2>{`${getLabelDay(this.state.year, this.state.month, indexDay+1)} - ${indexDay + 1}`}</h2>
                                {dayPlanning.events.map((event, indexEvent) =>
                                    <div key={`event_${indexEvent}`}>
                                        <button className={`p-2 bg-beach-red`} onClick={this.deleteEvent(indexDay, indexEvent)} type="button">X</button>
                                        <PlanningBuilderInput field="type" event={event} indexDay={indexDay} indexEvent={indexEvent} handleChangePlaning={this.handleChangePlaning} options={availableType} />
                                        <PlanningBuilderInput field="start" event={event} indexDay={indexDay} indexEvent={indexEvent} handleChangePlaning={this.handleChangePlaning} options={availableHours} />
                                        <PlanningBuilderInput field="end" event={event} indexDay={indexDay} indexEvent={indexEvent} handleChangePlaning={this.handleChangePlaning} options={availableHours} />
                                        <PlanningBuilderInput field="label" event={event} indexDay={indexDay} indexEvent={indexEvent} handleChangePlaning={this.handleChangePlaning} options={availableLabel} />
                                        <div>
                                            <button className={`p-4 ${this.participantsIsNull(event) ? "bg-beach-green" : "bg-beach-red"}`} onClick={this.triggerParticipants(indexDay, indexEvent)} type="button">trigger participants</button>
                                            {!this.participantsIsNull(event) &&
                                                <div className="flex flex-col">
                                                    <label>max participants :
                                                            <input type="number" value={event.participants.max} onChange={this.handleChangePlaning(indexDay, indexEvent, "participants-max")} />
                                                    </label>

                                                    <label>booked participants :
                                                            <input type="number" value={event.participants.booked} onChange={this.handleChangePlaning(indexDay, indexEvent, "participants-booked")} />
                                                    </label>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )}
                                <button className={`p-2 bg-beach-green`} onClick={this.addEvent(indexDay)} type="button">+</button>

                            </div>

                            <div >
                                <pre>{JSON.stringify(dayPlanning, null, 2)}</pre>
                            </div>

                        </div>

                    )}

                    <div>
                        <button onClick={this.showJsonFile}>show json file</button>
                    </div>
                </section>

                {this.state.showJsonFile > 0 &&
                    <section className="bg-red-200">
                        <h2>file : {this.getJsonFileName()}</h2>
                        <pre>{JSON.stringify(this.state.planning, null, 2)}</pre>
                    </section>}
            </div>
        )
    }
}