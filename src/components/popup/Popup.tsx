import './Popup.css';
import { useState } from 'react';
import { processCsv } from '../../helpers/parseFile.ts';

const Popup = (): JSX.Element => {
    const [p, setP] = useState(null);

    /*
       const changeHandler =  async (event: React.ChangeEvent) => {
        const target= event.target as HTMLInputElement;
        const parsed = target?.files ?  target.files[0] : null;

        console.log(parsed)
            setP(parsed)


    };
     */
    const changeHandler = async (event: any) => {
        console.log('setting up handler');
        if (event.target.files[0]) {
            const c = await processCsv(event.target.files[0]);
            console.log(c);
            setP(c);
        }
    };

    // @ts-ignore
    return (
        <>
            <h2>campaign performance analyzer</h2>
            <div className="card">
                <p>Upload a csv file here</p>
                <input
                    type="file"
                    name="file"
                    accept=".csv"
                    onChange={changeHandler}
                    style={{ display: 'block', margin: '10px auto' }}
                />
                {p?.count && (
                    <div>
                        <table border={1}>
                            <thead>
                                <tr>
                                    {p.headers.map((header: string) => (
                                        <th>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {p.formattedDays.map((day: any, i: number) => {
                                    return (
                                        <tr key={i}>
                                            {day.map(
                                                (
                                                    total: string | number,
                                                    j: number
                                                ) => (
                                                    <td key={i + ':' + j}>
                                                        {total}
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td colSpan={19}>Total</td>
                                </tr>
                                <tr>
                                    {p.formattedTotal.map(
                                        (total: string | number, k: number) => (
                                            <td key={'h' + k}>{total}</td>
                                        )
                                    )}
                                </tr>
                            </tbody>
                        </table>
                        <p>{p.count || 0} entries </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Popup;
