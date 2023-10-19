import React from "react";

export default function Position(props) {
  const { position, top, left } = props;

  const container = {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    overflow: "auto",
    height: "300px",
  };

  const box = {
    width: "200px",
    height: "200px",
    marginTop: "20%",
    backgroundColor: "darkblue",
  };

  const middle = {
    width: "200px",
    height: "200px",
    backgroundColor: "yellow",
    position: position,
    top: top,
    left: left,
  };

  const story = {
    position: "absolute",
    zIndex: "-1",
  };

  return (
    <div style={container}>
      <p style={story}>
        Beautiful is better than ugly. Explicit is better than implicit. Simple is better than complex. Complex is
        better than complicated. Flat is better than nested. Sparse is better than dense. Readability counts. Special
        cases aren't special enough to break the rules. Although practicality beats purity. Errors should never pass
        silently. Unless explicitly silenced. In the face of ambiguity, refuse the temptation to guess. There should be
        one-- and preferably only one --obvious way to do it. Although that way may not be obvious at first unless
        you're Dutch. Now is better than never. Although never is often better than *right* now. If the implementation
        is hard to explain, it's a bad idea. If the implementation is easy to explain, it may be a good idea. Namespaces
        are one honking great idea -- let's do more of those! Beautiful is better than ugly. Explicit is better than
        implicit. Simple is better than complex. Complex is better than complicated. Flat is better than nested. Sparse
        is better than dense. Readability counts. Special cases aren't special enough to break the rules. Although
        practicality beats purity. Errors should never pass silently. Unless explicitly silenced. In the face of
        ambiguity, refuse the temptation to guess. There should be one-- and preferably only one --obvious way to do it.
        Although that way may not be obvious at first unless you're Dutch. Now is better than never. Although never is
        often better than *right* now. If the implementation is hard to explain, it's a bad idea. If the implementation
        is easy to explain, it may be a good idea. Namespaces are one honking great idea -- let's do more of those!
        Beautiful is better than ugly. Explicit is better than implicit. Simple is better than complex. Complex is
        better than complicated. Flat is better than nested. Sparse is better than dense. Readability counts. Special
        cases aren't special enough to break the rules. Although practicality beats purity. Errors should never pass
        silently. Unless explicitly silenced. In the face of ambiguity, refuse the temptation to guess. There should be
        one-- and preferably only one --obvious way to do it. Although that way may not be obvious at first unless
        you're Dutch. Now is better than never. Although never is often better than *right* now. If the implementation
        is hard to explain, it's a bad idea. If the implementation is easy to explain, it may be a good idea. Namespaces
        are one honking great idea -- let's do more of those!
      </p>
      <div style={box}></div>
      <div style={middle}></div>
      <div style={box}></div>
    </div>
  );
}
