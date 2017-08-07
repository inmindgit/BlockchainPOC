import { connect } from 'react-redux'
import TestForm from './TestForm'
import { testActions } from './TestFormActions'

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTestFormSubmit: (id) => {
            event.preventDefault();

            dispatch(testActions(id))
        }
    }
}

const TestFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TestForm)

export default TestFormContainer
