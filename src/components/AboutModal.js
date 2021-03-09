import React from "react";
import { connect } from 'react-redux'
import { hideAboutModal } from '../redux/reducers/core'

function AboutModal(props) {
  if (props.showModal) {
    return (
        <>
          <div id="modal"
            className="flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
            onClick={() => props.hideAboutModal()}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    HIRDS Explorer
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.hideAboutModal()}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto leading-relaxed">
                  <p className="mb-4">NIWA's High Intensity Rainfall Design System (HIRDS) provides estimates of high intensity rainfall at across New Zealand for a range of return periods and event durations. The primary web interface is at <a href="https://hirds.niwa.co.nz/">hirds.niwa.co.nz</a>. For a detailed description of the underlying model, refer to the <a href="https://niwa.co.nz/sites/niwa.co.nz/files/2018022CH_HIRDSv4_Final.pdf">HIRDSv4 Technical Report</a> (Trevor Carey-Smith et al, 2018).</p>

                  <p>This website was developed by <a href="https://www.linkedin.com/in/cameron-oliver-46a640b6/">Cameron Oliver</a>, a flood modeller based in Christchurch, as an <a href="https://github.com/col16/hirdsexplorer">open-source project</a>. Data is taken from the 2 km resolution dataset <a href="https://data-niwa.opendata.arcgis.com/datasets/edcbe0a99d7f4df59501ba55973648f5">available online</a>.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => props.hideAboutModal()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      );
    } else {
      return null;
    }
}


const mapStateToProps = state => {
  return { showModal: state.core.ui_about_modal_displayed };
};

export default connect(
  mapStateToProps,
  { hideAboutModal }
)(AboutModal);
