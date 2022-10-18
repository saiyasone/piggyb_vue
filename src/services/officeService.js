import axios from "axios";

export async function getOffice() {
    const res = await axios.get('office')
    return res.data
}

export async function updateOffice(payload) {
    const f = new FormData()
    for (const key in payload) {
        f.append(key, payload[key])
    }
    return await axios.put('office', f)
}