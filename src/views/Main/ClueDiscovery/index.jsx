import React from 'react';
// import compnents from '@/components/load-components.js'
// const { Aexample }=compnents;
import { ZpageHeader } from 'zerod';

function Test(props) {
    const hasParams = props.location.params;
    console.log(hasParams);
    return (
        <div>
            <ZpageHeader title="test1"
                breadcrumbRoutes={[
                    { name: 'test1', link: false },
                    { name: 'detail', link: false }
                ]}
                content={hasParams && hasParams.a ? hasParams.a : 'test'}
            >
            </ZpageHeader>
        </div>
    );
}
export default Test;
