import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import { action } from "./action";

export default async function Page() {
    const data = await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai', {
        next: { 
            tags: ['collection'] 
        }
    });
    return (
        <div>
            <div>time: {data.datetime}</div>
            <form
                action={action}
            >
                <p
                    style={{ padding: 20, paddingLeft: 0 }}
                >
                    <input 
                        type="radio" 
                        id="flush_1" 
                        name="flush" 
                        value={1} 
                        checked 
                    />
                    <label 
                        htmlFor="flush_1"
                        style={{ marginRight: 10 }}
                    >
                        yes
                    </label>
                    <input 
                        type="radio" 
                        id="flush_0" 
                        name="flush" 
                        value={0} 
                    />
                    <label 
                        htmlFor="flush_0"
                    >
                        no
                    </label>
                </p>
                <button type="submit">send to up</button>
            </form>
        </div>
    );
}