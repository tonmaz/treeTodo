import React, {forwardRef} from "react";
import {Helmet} from "react-helmet";

const Page = forwardRef(({title, children, ...rest}, ref) => {
    // const location = useLocation();

    // const sendPageViewEvent = useCallback(() => {
    //   track.pageview({
    //     page_path: location.pathname
    //   });
    // }, [location]);
    //
    // useEffect(() => {
    //   sendPageViewEvent();
  // }, [sendPageViewEvent]);

  return (
      <div ref={ref} {...rest}>
          <Helmet>
              <title>{title}</title>
          </Helmet>
          {children}
      </div>
  );
});

export default Page;
