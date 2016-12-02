export default function (args: any) {
    if (!process.env.DISABLE_LOGS) {
        console.log.apply(this, arguments);
    }
}