import React from 'react'
import './Entries.css'
import Entry from './Entry';
import {withAppConsumer} from './Context'

function Entries({context}) {
    
    const {entries} = context
    return (
        <div className="entries">
            {entries.length === 0 ? <div className="mycard entry">
                No entries yet
            </div>  :
              <> {entries && entries.map(entry => 
                <Entry key={entry.id} data={entry}/>
             )} </>
            }
           
          
        </div>
    )
}

export default withAppConsumer(Entries)
