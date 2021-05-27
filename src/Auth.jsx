import  React  from  'react';
import  validator  from  'validator';
import { NavLink, withRouter } from  'react-router-dom';

class  Auth  extends  React.Component {
    constructor() {
        super();
        this.state = {
            dispalyPhonePage:  true,
            phoneNumber:  '',
            otp:  '',
            invalid:  '',
            msg:  ''
        };
    }

    handleChange = event  => {
        this.setState({ invalid:  '', msg:  '' });
        let { name, value } = event.target;
        this.setState({ [name]:  value });
    };

    editPhoneNo = () => {
        this.setState({ dispalyPhonePage:  true });
    };

    handleSendOtp = () => {
        this.setState({ dispalyPhonePage:  false });
        fetch('/api/v1/users/sendotp',
            {
                method:  'POST',
                headers: {
                    'Content-Type':  'application/json'
                },
                body:  JSON.stringify({
                    phoneNumber:  this.state.phoneNumber
                })
            }
        )
        .then(res  =>  res.json())
        .then(data  => {
            if (data.success) {
                this.setState({ dispalyPhonePage:  false });
            } else {
                this.setState({ dispalyPhonePage:  true });
            }
        });
    };

    submitPhoneNo = e  => {
        e.preventDefault();
        if(this.state.phoneNumber) {
            validator.isMobilePhone(this.state.phoneNumber)
                ? this.handleSendOtp()
                : this.setState({ invalid:  'Enter a valid Phone Number' })
        }
        else {
            this.setState({ msg:  "Phone Number can't be empty" });
        }
    };

    handleVerifyOtp = e  => {
        e.preventDefault();
        if(this.state.otp){
            fetch('/api/v1/users/verifyotp',
                {
                    method:  'POST',
                    headers: {
                        'Content-Type':  'application/json'
                    },
                    body:  JSON.stringify({
                        phoneNumber:  this.state.phoneNumber,
                        otp:  this.state.otp
                    })
                }
            )
            .then(res  =>  res.json())
            .then(data  => {
                if (data.success) {
                    localStorage.setItem('storiesloggeduser', data.signuptoken);
                    localStorage.setItem('storiesloggeduserid', data.userId);
                    this.props.handleIslogged(true);
                    this.props.history.push('/');
                }
                if (!data.success) this.setState({ msg:  data.message });
                if (data.logintoken) {
                    localStorage.setItem('storiesloggeduser', data.logintoken);
                    localStorage.setItem('storiesloggeduserid', data.userId);
                    this.props.handleIslogged(true);
                    this.props.history.push('/');
                }
            })
        }
        else {
            this.setState({ msg:  "OTP can't be empty" })
        }
    };

    displayPhonePage = () => {
        return (
            <form onSubmit={this.submitPhoneNo}>
                <label>{this.state.invalid}</label>
                <label>{this.state.msg}</label>
                <label>Enter a phone number</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="8888888888"
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                    required
                />
                <input type="submit"  value="NEXT"/>
            </form>
        )
    }

    displayOtpPage = () => {
        return (
            <form onSubmit={this.handleVerifyOtp}>
                <label>{this.state.invalid}</label>
                <label>{this.state.msg}</label>
                <label>Enter OTP</label>
                <input
                    type="tel"
                    name="otp"
                    placeholder="8432"
                    value={this.state.otp}
                    onChange={this.handleChange}
                    required
                />
                <div>
                    <button onClick={this.editPhoneNo}>Edit Phone Number </button>
                    <button onClick={this.handleSendOtp}> Resend OTP </button>
                </div>
                <input type="submit"  value="NEXT"/>
            </form>
        )
    }

    render() {
        let { dispalyPhonePage } = this.state;
        return(
            <>
                {dispalyPhonePage ? this.displayPhonePage() : this.displayOtpPage()}
            </>
        )
    }
}
export  default  withRouter(Auth);