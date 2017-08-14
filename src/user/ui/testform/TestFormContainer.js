import { connect } from 'react-redux'
import TestForm from './TestForm'
import {testActions, testResult} from './TestFormActions'

const mapStateToProps = (state, ownProps) => {
    return {
        id: state.idUser.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTestFormSubmit: (id) => {
            event.preventDefault();

            dispatch(testActions(id))
        },
        onChargueForm: () => {
            dispatch(testResult())
        }
    }
}

const TestFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TestForm)

export default TestFormContainer
