export function ColorBox({ color }) {

    const syl = {
        width: "140px",
        height: "25px",
        background: color,
        marginTop: "10px",
    };
    return (
        <div style={syl}></div>
    );
}