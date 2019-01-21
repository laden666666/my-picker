export default function(){
    return (<ITimeline>
        {this.slots.map((item, index)=>{
            return <ITimelineItem key={index}>{item}</ITimelineItem>
        })}
    </ITimeline>)
}