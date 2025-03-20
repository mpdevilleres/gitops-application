FROM python:3.12-slim AS base

WORKDIR /opt

FROM base AS builder
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

ENV UV_LINK_MODE=copy
ENV UV_COMPILE_BYTECODE=1

COPY ./pyproject.toml ./uv.lock ./README.md ./

# Install dependencies
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project --no-editable

FROM base AS runtime

# ARG VERSION
# ENV VERSION=${VERSION}

COPY --from=builder /opt/.venv /opt/.venv

COPY ./src ./src

ENV PATH=/opt:/opt/.venv/bin:${PATH}
ENV PYTHONPATH=/opt

CMD ["python", "src/main.py"]