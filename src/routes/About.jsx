import CaptionImage from "@/Articles/CaptionImage"
import Header from "@/Articles/Header"
import Paragraph from "@/Articles/Paragraph"

const textSectionStyles = "sm:col-span-9 col-span-12 flex flex-col gap-4"
const imageSectionStyles = "sm:col-span-3 col-span-12"

export default function About() {
    return (
        <div className="flex flex-col gap-16 mb-20">
            <div className="grid grid-cols-12 gap-6 items-start">
                <div className={imageSectionStyles}>
                    <CaptionImage src="https://khn6vfmiqjxyjkhw.public.blob.vercel-storage.com/armscrossed.png" />
                </div>
                <div className={textSectionStyles}>
                    <Header>Hi, my name is Brendan.</Header>
                    <Paragraph>
                        <b>TL;DR</b>: Frequently moving between rentals made me
                        resent Ikea furniture and build my own desk. An
                        abundance of time (COVID) and a lack of funds encouraged
                        me build my own storage solutions for my 90sqft bedroom.
                        A lack of tools pushed me towards a career that could
                        see me afford them (BSc Computer Science, Software
                        Engineer). A national recession caused a layoff that
                        made me ask the question: "why don't I just do what I
                        love and find a way to make it work?".
                    </Paragraph>
                    <Paragraph>
                        <b className="text">
                            If every woodworker has an unconventional road to
                            woodworking, are any of them truly unconventional?
                        </b>
                    </Paragraph>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 items-start">
                <div className={`${imageSectionStyles} order-1 sm:order-2`}>
                    <CaptionImage
                        src="https://khn6vfmiqjxyjkhw.public.blob.vercel-storage.com/about/desk.jpeg"
                        caption="My uneven, unstable, rough cut fir desk top."
                    />
                </div>
                <div className={`${textSectionStyles} order-2 sm:order-1`}>
                    <Header>2018: A Journey Begins</Header>
                    <Paragraph>
                        The first project I took on was the desk top for a metal
                        base I had contracted. Not having any tools, I payed
                        somebody $50 to let me plane down and joint the edges of
                        my big box lumber. I was convinced my doweling jig would
                        get my panel dead flat. It did anything but. On the
                        bright side, I would never have to deal with process of
                        building or moving Ikea furniture ever again.
                    </Paragraph>
                    <Paragraph>
                        Now knowing I enjoyed making things with my hands, I
                        knew that one day I would have to have a shop. But...
                        woodworking "does not pay", which lead to me
                        re-enrolling in University. I would assuredly be able to
                        afford my own shop by "Learning to code", right?
                    </Paragraph>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 items-start">
                <div className={imageSectionStyles}>
                    <CaptionImage
                        src="https://khn6vfmiqjxyjkhw.public.blob.vercel-storage.com/about/shelf.png"
                        caption="My first real build."
                    />
                </div>
                <div className={textSectionStyles}>
                    <Header>2020: Lockdown Builds</Header>
                    <Paragraph>
                        With the onset of COVID and school moving online, I had
                        more free time to work on projects. I bought a drill and
                        a circular saw and got to building the things my room
                        lacked. I didn't have a garage or a drive way, so all
                        builds would be done in the yard of an 8 person rental.
                    </Paragraph>
                    <Paragraph>
                        This shelf was far from perfect, but I built it. Through
                        and through. Fingers were malleted, but the things I
                        learned lead me to fully furnishing my room with both my
                        own builds and restored marketplace items.
                    </Paragraph>
                </div>
            </div>

            {/* Row 4: Text Left, Image Right on Desktop */}
            <div className="grid grid-cols-12 gap-6 items-start">
                <div className={`${imageSectionStyles} order-1 sm:order-2`}>
                    <CaptionImage
                        src="https://khn6vfmiqjxyjkhw.public.blob.vercel-storage.com/about/shop.png"
                        caption="My garage and soon-to-be workshop."
                    />
                </div>
                <div className={`${textSectionStyles} order-2 sm:order-1`}>
                    <Header>2025: Graduation and Job Woes</Header>
                    <Paragraph>
                        A newly graduated Computer Science student I was
                        welcomed into a barren job market filled with
                        nothingness. Hundreds of hand written applications
                        earned me hundreds of automated rejection letters, until
                        finally, I landed my first job.
                    </Paragraph>
                    <Paragraph>
                        All money I made beyond "just getting by" went into
                        getting tools to build. I made a list of everything I
                        needed, and scoured marketplace every day, getting
                        things at a price I could "afford".
                    </Paragraph>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6 items-start">
                <div className={imageSectionStyles}>
                    <CaptionImage
                        src="https://khn6vfmiqjxyjkhw.public.blob.vercel-storage.com/about/dresser.jpeg"
                        caption="A dresser circa the 1940's, restored."
                    />
                </div>
                <div className={textSectionStyles}>
                    <Header>2026: A Pivot</Header>
                    <Paragraph>
                        The job was everything I wished it wasn't. Somewhat
                        inconceivably I was appreciated even less than I was
                        payed. Finally, enough was enough, and I moved on.
                    </Paragraph>
                    <Paragraph>
                        Building things for myself wasn't going to earn a
                        living. I began restoring old furniture, as well as
                        designing and producing original builds to sell.
                    </Paragraph>
                </div>
            </div>
        </div>
    )
}
